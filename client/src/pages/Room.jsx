import React from "react";
import { useSocketContext } from "../socketContext";

export default function Room(){

    console.log(useSocketContext());
    const { emitMessage } = useSocketContext();
    const sendMessage = ()=>{
      emitMessage("helo");
      console.log("emmited");
    }

    return (
        <p>
            the page is the room one...
            <button onClick={sendMessage}>emit the message..</button>
        </p>
    )
}