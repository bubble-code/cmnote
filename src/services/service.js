import { db } from "../firebase";
import { collection, getDoc, getDocs, doc, query, addDoc, setDoc, deleteDoc, updateDoc, where } from 'firebase/firestore';
import moment from "moment";


class DataService {
    _pathComunidades = "/salones";
    _collectionAgencias = "/CM/agencias/listagencias";
    _collectionCM = "/CM/cm/cm";
    _pathCM = "/CM/cm/cm";
    _pathDxCode = "/dxCode";
    _pathService = "/CM/Services/Services";

    // ********************************** LIST ****************************************************
    // #region GETS
    async listAgencias() {
        const collectionn = collection(db, `${this._collectionAgencias}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    async getCms() {
        const collectionn = collection(db, `${this._collectionCM}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs.map((item) => ({ label: item.id, pNumber: item.data()['pNumber'], sCode: item.data()['sCode'] }));
    }
    async getServices() {
        const collectionn = collection(db, `${this._pathService}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs.map((item) => ({ label: item.data()['service'], id: item.id, ...item.data() }));
    }
    async addService({ data }) {
        const { service, description } = data;
        const docRef = doc(db, `${this._pathService}`, `${service}`);
        await setDoc(docRef, { service, description });
    }

    async deleteService({ id }) {
        const docRef = doc(db, `${this._pathService}`, `${id}`);
        await deleteDoc(docRef);
    }
    async updateService({ id, data }) {
        const docRef = doc(db, `${this._pathService}`, `${id}`);
        await updateDoc(docRef, data);
    }

    async getDetailsServices({ serviceId }) {
        const docRef = doc(db, `${this._pathService}`, `${serviceId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().description.map((item) => ({ label: item, value: item }));
        } else {
            console.log("Document with id: ", serviceId, " does not exist!");
        }
    }

    async createBilling({ data }) {
        const { cm } = data;
        try {
            const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
            await addDoc(collectionn, { ...data });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async saveNote({ cm, id, data }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        await updateDoc(docRef, data);
    }

    // ===========================================
    sortByDate(data) {
        const objectSort = {};
        Object.keys(data).sort((a, b) => moment(a, "DDMMYYYY").diff(moment(b, "DDMMYYYY"))).forEach((key) => {
            objectSort[key] = data[key].sort((a, b) => moment(a.timeStart, "HHmm").diff(moment(b.timeStart, "HHmm")));
        });
        return objectSort;
    }

    async getBillingOpenByCm({ cm }) {
        if (cm) {
            const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
            const querySnapShot = query(collectionn, where("status", "==", "open"));
            const result = await getDocs(querySnapShot)
            const cWithBill = new Set();
            const fetchDataGroupByDate = result.docs.reduce((acc, cur) => {
                // console.log("cur.data()", cur.data());
                const id = cur.id;
                const { fecha } = cur.data();
                if (!acc[fecha]) {
                    acc[fecha] = [];
                }
                acc[fecha].push({ id, ...cur.data() });
                cWithBill.add(cur.data().cn);
                return acc;
            }, {});
            const data = this.sortByDate(fetchDataGroupByDate);

            // console.log(cWithBill);
            return { initialData: data, data, clienWithBill: [...cWithBill] };
        }
    }

    //#endregion

    // ********************************** CRUD Billings****************************************************
    // #region CRUD Billings


    // async deleteService({ cm, id }) {
    //     const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
    //     await deleteDoc(docRef);
    // }

    //     async updateService({ cm, id, data }) {
    //     const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
    //     await updateDoc(docRef, data);
    // }

    async addNewClient({ cm, data }) {
        const { name, lastName } = data;
        const docRef = doc(db, `${this._pathCM}/${cm}/activeClient/`, `${name} ${lastName}`);
        await setDoc(docRef, data);
    }
    async addNewDxCode({ dxData }) {
        try {
            const { dxCode, dxDesx } = dxData;
            const dxDescription = dxDesx.trim();
            const docRef = doc(db, `${this._pathDxCode}`, `${dxCode}`);
            await setDoc(docRef, { dxCode, dxDescription });
            return true;

        } catch (error) {
            console.log('addNewDxCode', error);
            return false;
        }
    }

    async addNewService({ serviceDx }) {
        try {
            const { serviceDesx } = serviceDx;
            const collRef = collection(db, `${this._pathService}`);
            await addDoc(collRef, { serviceDesx });
            return true;

        } catch (error) {
            console.log('addNewService', error);
            return false;
        }
    }

    // #endregion


    // ********************************** GETS ****************************************************
    // #region GETS
    async getServiceById({ cm, id }) {
        if (id) {
            const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data());
            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id };
            } else {
                // doc.data() will be undefined in this case
                console.log("Document with id: ", id, " does not exist!");
            }
        } else {
            return {}
        }
    }

    async totalUnits({ cm, day }) {
        let total = 0;
        try {
            const conllectionn = collection(db, `${this._pathCM}/${cm}/openBilling/${day}/1`);
            const querySnapShot = query(conllectionn);
            const result = await getDocs(querySnapShot);
            result.docs.forEach((item) => {
                total += item.data().u;
                // console.log(total)
            })
        } catch (error) {
            console.log(error);
        }
        return total;
    }

    async getClients({ cm }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/activeClient`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs.map((item) => {
            // const { name, lastName } = item.data();
            return { label: item.id, cnumb: item.data().cnumb };
        });
    }
    // { id: item.id, label: item.data()['serviceDesx'], ...item.data() }

    async listActivedClients({ cm }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/activeClient`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }

    async listBilling({ cm }) {
        const billingsOpen = await this.listBillingOpenByCm({ cm });
        const response = [];
        return Promise.all(billingsOpen.map(async (item) => {
            return await this.listBillingOpenByCm({ cm, day: item.id });
        })).then((result) => {
            result.forEach((item) => {
                item.forEach((item2) => {
                    response.push(item2.data());
                })
            });
            return response;
        }
        );
    }
    async listNoteByClient({ cm, name }) {
        // console.log(name);
        const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
        const querySnapShot = query(collectionn, where('status', '==', 'completed'), where("cn", "==", `${name}`));
        const result = await getDocs(querySnapShot)

        const arraOfData = result.docs.map((item) => {
            return { id: item.id, ...item.data() }
        })
        arraOfData.sort((a, b) => moment(b.fecha, "DD-MM-YYYY") - moment(a.fecha, "DD-MM-YYYY"));
        return arraOfData;
    }
    // #endregion 

    // **********************************Lists****************************************************
    // #region Search


    async searchHelper({ value }) {
        // console.log("value", value);
        const resultFinal = [];
        const listCMa = await this.listCM();
        // console.log(listCMa);
        const prevResult = Promise.allSettled(listCMa.map(async (item) => {
            // console.log("item.id", item.label);
            const collectionn = collection(db, `${this._pathCM}/${item.label}/openBilling`);
            const querySnapShot = query(collectionn, where('status', '==', 'completed'));
            const result = await getDocs(querySnapShot);
            return result.docs;
        })
        ).then((result) => {
            result.forEach((item2) => {
                // console.log("result", item2);
                if (item2.status === "fulfilled") {
                    // resultFinal.push(
                    item2.value.map((item) => {
                        Object.values(item.data().description).forEach((item3) => {
                            // console.log(item3);
                            if (item3.toLowerCase().includes(value.toLowerCase())) {
                                resultFinal.push(item.data());
                            }
                        });
                    })
                }
            });
            // console.log("resultFinal", resultFinal);
            resultFinal.sort((a, b) => moment(b.fecha, "DD-MM-YYYY") - moment(a.fecha, "DD-MM-YYYY"));
            return resultFinal;
        }).catch((error) => {
            console.log(error);
            return [];
        });
        // console.log("Result Final", resultFinal);
        // return prevResult.sort((a, b) => moment(b.fecha, "DD-MM-YYYY") - moment(a.fecha, "DD-MM-YYYY"));
        return prevResult;
    }

    // #endregion


}


export default new DataService();