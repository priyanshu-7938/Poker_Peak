import React, { createContext, useContext, useState } from "react";


const thisContext = createContext();

export default function ContextProvierAllOver({ children }){
    const [ value, setValue ] = useState(0);


    return (
        <thisContext.Provider value={{
            value,
        }}>
            { children }
        </thisContext.Provider>
    )
}


export const useTheContext =  () =>{
    return useContext(thisContext);
};