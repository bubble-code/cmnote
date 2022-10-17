import { createContext, useContext, useMemo, useReducer } from "react";


const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthReducer(state, action) {
    switch (action.type) {
        case "LOGIN_OK":
            return { ...state, user: action.payload, loading: false };
        case "LOGOUT":
            return { ...state, user: null, error: action.payload, loading: false };
        case "USER_LOADING":
            return { ...state, loading: action.payload.loading };
        case "USER_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}


function AuthContextProvider({ children }) {

    const initialState = {
        user: null,
        password: null,
        loading: false,
        error: null,
    };

    const [controller, dispatch] = useReducer(AuthReducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Context not found");
    }
    return context;
};





export { AuthContextProvider, UserAuth };
