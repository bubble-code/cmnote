import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";


const authCreateUser = async (dispatch, value) => {
    const { user, password } = value;
    dispatch({ type: "USER_LOADING", payload: { loading: true } });
    await createUserWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "LOGIN_OK", payload: user });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({ type: "USER_ERROR", payload: errorMessage });
            console.log(errorCode, errorMessage);
        });
};

const authLogin = async (dispatch, value) => {
    const { user, password } = value;
    dispatch({ type: "USER_LOADING", payload: { loading: true } });
    await signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "LOGIN_OK", payload: user });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({ type: "USER_ERROR", payload: errorMessage });
            console.log(errorCode, errorMessage);
        });
};

const authLogout = async (dispatch) => {
    dispatch({ type: "USER_LOADING", payload: { loading: true } });
    await signOut(auth)
        .then(() => {
            dispatch({ type: "LOGOUT", payload: null });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({ type: "USER_ERROR", payload: errorMessage });
            console.log(errorCode, errorMessage);
        });
};





export { authCreateUser, authLogin, authLogout }; 