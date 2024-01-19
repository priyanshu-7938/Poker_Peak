import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(){
    const thisUrl = window.location.href;
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-3 mt-3">
                <Link to={"account"}>
                    <div className="flex gap-1 items-center">
                        <p className="text-3xl">🧿</p>
                        <div className="flex flex-col">
                            <p className="font-bold">My Account</p>
                            <div className={`h-[3px] rounded-[30px] ${thisUrl.includes("account")? "bg-[#3f3f3f]":""}`}></div>
                        </div>
                    </div>
                </Link>
                <Link to={"dashboard"}>
                    <div className="flex gap-1 items-center">
                        <p className="text-3xl">🎴</p>
                        <div className="flex flex-col">
                            <p className="font-bold">Dashboard</p>
                            <div className={`h-[3px] rounded-[30px] ${thisUrl.includes("dashboard")? "bg-[#3f3f3f]":""}`}></div>
                        </div>
                    </div>
                </Link>
                <Link to={"tournament"}>
                    <div className="flex gap-1 items-center">
                        <p className="text-3xl">🎮</p>
                        <div className="flex flex-col">
                            <p className="font-bold">Tournament</p>
                            <div className={`h-[3px] rounded-[30px] ${thisUrl.includes("tournament")? "bg-[#3f3f3f]":""}`}></div>
                        </div>
                    </div>
                </Link>
                <Link to={"addMoney"}>
                    <div className="flex gap-1 items-center">
                        <p className="text-3xl">💶</p>
                        <div className="flex flex-col">
                            <p className="font-bold">Add Money</p>
                            <div className={`h-[3px] rounded-[30px] ${thisUrl.includes("addMoney")? "bg-[#3f3f3f]":""}`}></div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="text-sm m-1 flex justify-center mt-auto">
                <p>@ellumina.2024</p>
            </div>
        </div>
    )
}