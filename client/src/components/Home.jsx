import React,{ useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Account, Dashboard, Tournament, AddMoney } from "../components";
import { NoPage } from "../pages";
import Navbar from "./HomeComponents/Navbar";
import Sidebar from "./HomeComponents/Sidebar";
import { useTheContext } from "../context";
import { useAddress } from "@thirdweb-dev/react";

export default function Home(){
    const { userData, setUserData } = useTheContext();
    const Navigate = useNavigate();
    const address = useAddress();
    useEffect(()=>{
        if(!userData || !address){
            Navigate("/login");
            setUserData(null);
            message.info("Session Expired!",1000);
        }
    },[userData, address]);

    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="bg-[#3f3f3f] h-[3px]"></div>
            <div className="flex flex-1">
                <div className="w-[10%]">
                    <Sidebar/>
                </div>
                <div className="w-[2px] bg-[#3f3f3f]"></div>
                <div>
                    <Routes>
                        <Route path="account" element={<Account />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="tournament" element={<Tournament />} />
                        <Route path="addMoney" element={<AddMoney />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}