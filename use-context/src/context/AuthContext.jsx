/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialAuthState = {
    isAuthenticated: false,
    user: null,
    token: null
};

const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

function authReducer(state, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case AUTH_LOGOUT:
            return initialAuthState;
        default:
            return state;
    }
}

// Create the context
export const AuthContext = createContext();

// Create the provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const login = (payload) => {
        dispatch({ type: AUTH_LOGIN, payload });
    };

    const logout = () => {
        dispatch({ type: AUTH_LOGOUT });
    };
    return (
        <AuthContext.Provider value={{ authState: state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

