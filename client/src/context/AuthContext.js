import { createContext,useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {"_id":"61a5f64b5bbcf846c8d74690","profilePicture":"post/7.jpeg","coverPicture":"post/3.jpeg","isAdmin":true,"username":"sam","email":"sam@sam.com","password":"$2b$10$BfiKFr.L.p/ve3lG4k0nY.otVsNZcSzWDOklwSkI5XpXhGsi6ea1S",
    "desc":"mise à jour du champ description 2","city":"Paris","from":"Kef, Tunisia","followings":[]},
    isFetching: false,
    error: false
};

export const AuthContext = createContext( INITIAL_STATE );

export const AuthContextProvider = ({children}) =>
{
    const [state, dispatch] = useReducer( AuthReducer, INITIAL_STATE );

    return (
        <AuthContext.Provider
        value={{user:state.user,isFetching:state.isFetching,error:state.error,dispatch}}
        >
        {children}
        </AuthContext.Provider>
    )
}