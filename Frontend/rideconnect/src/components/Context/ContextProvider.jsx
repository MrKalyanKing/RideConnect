import { createContext } from "react";


export const contextprovider = createContext();

const ContextProvider = ({ children }) => {
    const url = "http://localhost:8080/api"



    const value = {
        url
    }
    return (
        <contextprovider.Provider value={value}  >{children}</contextprovider.Provider>
    )
}

export default ContextProvider