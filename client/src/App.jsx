import { useState , useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketContextProvier from './socketContext';
import { NoPage, Login, SignUp, Room } from "./pages";
import Home from "./components/Home"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
              <Route path="blogs" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="/room/:roomToken" element={<Room />}></Route>
            </Routes>
        </BrowserRouter>
      </div>
      <p>
        Hello!!
      </p>
    </>
  )
}

export default App
