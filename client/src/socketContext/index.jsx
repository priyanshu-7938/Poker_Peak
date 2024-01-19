import React,{ createContext, useContext, useState } from "react";
import { socket } from "../socket";

const thisContext = createContext();
// socket.connect();

export default function SocketContextProvier({ children }){
    const [ value, setValue ] = useState(0);

    function emitMessage(str){
        socket.emit("message",{
          event: str,
        });
    }
    
    return (
        <thisContext.Provider value={{
            emitMessage,
        }}>
            { children }
        </thisContext.Provider>
    )
}


export const useSocketContext =  () =>{
    return useContext(thisContext);
};