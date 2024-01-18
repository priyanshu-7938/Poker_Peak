import React,{ useEffect } from "react";
import { useSocketContext } from "../socketContext";
import { socket } from "../socket";

export default function Room(){

    console.log(useSocketContext());
    const { emitMessage } = useSocketContext();
    const sendMessage = ()=>{
      emitMessage("helo");
      console.log("emmited");
    }

    useEffect(()=>{
        console.log("in the useEffect");
        socket.on("message",(data)=>{
            console.log("in the socket.on");
            alert(data.event);});

    },[socket]);

    return (
        <p>
            the page is the room one...
            <button onClick={sendMessage}>emit the message..</button>
        </p>
    )
}