import React,{ useEffect, useState } from "react";
import { useSocketContext } from "../socketContext";
import { socket } from "../socket";
import useSocketSetupForRoom from "../socketUtils/useSocketSetupForRoom";

export default function Room(){
    const [ message, setMessage ] = useState("");
    const { emitMessage } = useSocketContext();
    const sendMessage = ()=>{
      emitMessage("helo");
      console.log("emmited");
    }
    
    useSocketSetupForRoom();

    return (
        <p>
            the page is the room one... message : {message}
            <button onClick={sendMessage}>emit the message..</button>
        </p>
    )
}