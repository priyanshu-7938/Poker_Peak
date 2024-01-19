import React from "react";
import load from "../assets/load.gif"

export default function Loading(){
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <img src={load} alt="" />
            </div>
        </>
    )
}