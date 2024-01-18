import { useState , useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketContextProvier from './socketContext';
import { NoPage, Login, SignUp, Room, Welcome } from "./pages";
import Home from "./components/Home"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Welcome />}/>
              <Route path="/home/*" element={<Home />}/>
              <Route path="*" element={<NoPage />} />
              <Route path="/room/:roomToken" element={<Room />}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
