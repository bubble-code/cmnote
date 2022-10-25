import DataService from '../../services/service';
import { updateAll } from '../Reducers/CmREducers';
import { loadingBillingByCm, errorBillingByCm, getBillingByCm } from "../Reducers/BillingByCmReducer";

// const updateAll = createAction('UPDATE_ALL');

const getCms = async (dispatch, func) => {
    const response = await DataService.getCms();
    dispatch(func(response));
};

const getBillingByCMs = async (dispatch, loadF, getF, errorF, cm) => {
    dispatch(loadF());
    try {
        const response = await DataService.getBillingOpenByCm({ cm: cm });
        dispatch(getF(response));
    } catch (error) {
        console.log("error loading billing by cm", error);
        dispatch(errorF(error));
    }
};

const getClients = async (cm) => {
    const response = await DataService.getClients({ cm: cm });
    return response;
};

const getServices = async () => {
    const response = await DataService.getServices();
    return response;
};

const addService = async (data) => {
    const description = data.dxc.split('\n');
    await DataService.addService({ data: { service: data.service, description: description } });
};

const deleteService = async (id) => {
    await DataService.deleteService({ id: id });
};

const updateService = async (data, id) => {
    await DataService.updateService({ data: data, id: id });
};

const getDetailsServices = async (idService) => {
    const response = await DataService.getDetailsServices({ serviceId: idService });
    return response;
};



export { getCms, getClients, getServices, addService, deleteService, updateService, getDetailsServices, getBillingByCMs };
