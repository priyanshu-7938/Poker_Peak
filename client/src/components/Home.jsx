// import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Account, Dashboard, Tournament, AddMoney } from "../components";
import { NoPage, Room } from "../pages";
import Navbar from "./HomeComponents/Navbar";
import Sidebar from "./HomeComponents/Sidebar";
import { useTheContext } from "../context";
// import { useAddress } from "@thirdweb-dev/react";
import { message } from "react-message-popup";
import Rooms from "./Rooms";

export default function Home() {
  const { setUserData } = useTheContext();
  // const address = useAddress();
  const token = localStorage.getItem("token");

  if (token == undefined || token == null) {
    setUserData(null);
    message.info("Session Expired!", 1000);
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {/* <div className="bg-[#3f3f3f] h-[3px]"></div> */}
      <div className="flex-1 flex ">
        <div className="px-4 bg-accent">
          <Sidebar />
        </div>

        <div className="w-[2px] bg-[#838383]"></div>
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:roomToken" element={<Room />}></Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tournament" element={<Tournament />} />
          <Route path="addMoney" element={<AddMoney />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

