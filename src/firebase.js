// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB4RrPdwk9GEJCbGIcI4dX8PRqxFvDdmFs",
    authDomain: "taller-31804.firebaseapp.com",
    databaseURL: "https://taller-31804.firebaseio.com",
    projectId: "taller-31804",
    storageBucket: "taller-31804.appspot.com",
    messagingSenderId: "1035085868157",
    appId: "1:1035085868157:web:131c9aa106340a9f51d514",
    measurementId: "G-5QRYM82YX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

export default app;