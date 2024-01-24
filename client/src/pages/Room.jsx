import React, { useEffect, useState } from "react";
import { useSocketContext } from "../socketContext";
import { socket } from "../socket";
import useSocketSetupForRoom from "../socketUtils/useSocketSetupForRoom";
import { Navigate, useSearchParams } from "react-router-dom";

export default function Room() {
  const [message, setMessage] = useState("");
  const { emitMessage } = useSocketContext();
  const [params] = useSearchParams();
  const roomToken = params.get("roomToken");
  const sendMessage = () => {
    emitMessage("helo");
    console.log("emmited");
  };

    useSocketSetupForRoom();
    
    if (!roomToken) {
        return <Navigate to='/home/rooms' />
    }

  console.log("roomToken : ", roomToken);

  return (
    <p>
      <h1>roomtoken : {roomToken}</h1>
      the page is the room one... message : {message}
      <button onClick={sendMessage}>emit the message..</button>
    </p>
  );
}
