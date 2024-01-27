// import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import SocketContextProvier from './socketContext';
import { NoPage, Login, SignUp, Room, Welcome } from "./pages";
import Home from "./components/Home";
import { useEffect } from "react";
import useSocket from "./hooks/useSocket";

function App() {
  const socket = useSocket(); 

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected socket.id : ', socket.id);
    })
  }, []);

  return (
    <>
        <div className="dark bg-background text-foreground h-screen font-montserrat">
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/room/:roomToken" element={<Room />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
