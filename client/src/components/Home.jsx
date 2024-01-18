import React from "react";
import { Route, Routes } from "react-router-dom";
import { Account, Dashboard, Tournament } from "../components";
import { NoPage } from "../pages";

export default function Home(){


    return (
        <div>
            <div>Hello home half section...</div>
            <div>
                <Routes>
                    <Route path="account" element={<Account />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tournament" element={<Tournament />} />

                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </div>
    )
}