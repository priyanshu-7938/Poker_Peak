import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";


export default function Welcome(){
    const navigator = useNavigate();
    return(
        <div className="h-full p-3">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className="flex items-center justify-center">
                        <img src={logo} className="h-[20px]" alt="" />
                    </div>
                    <p className="text-2xl font-goudy italic font-bold">Poker Peak</p>
                </div>        
                <div className="flex gap-3">
                    <button className="p-1 px-4 rounded-[30px] border-2 bg-[#F4EAE0] border-[#F4DFC8]"
                    onClick={()=>{navigator("/signup")}}>
                        Sign up
                    </button>
                    <button className="p-1 px-4 rounded-[30px] border-2 bg-[#F4EAE0] border-[#F4DFC8]"
                    onClick={()=>{navigator("/login")}}>
                        Log in
                    </button>
                </div>
            </div>
        
            <div className="h-[80hv] pt-4 flex items-center justify-center">
            <div className="max-w-2xl p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 flex gap-2 text-[#707070]">Welcome to <p className="font-bold font-goudy text-[#000]">Poker Peak</p> 🎴</h1>

                <p className="text-xl mb-6">Explore the Future of Poker on the Blockchain!</p>

                <div className="grid gap-4">
                <div className="flex items-center">
                    <p className="text-5xl">🌈</p>
                    <p className="text-lg">
                        <p className="font-bold">Decentralized Gameplay:</p> Play without borders!
                    </p>
                </div>

                <div className="flex items-center">
                    <p className="text-5xl">💎</p>
                    <p className="text-lg">
                        <p className="font-bold">Token Utility:</p> Utilize and validate your gameplay with our native tokens.
                    </p>
                </div>

                <div className="flex items-center">
                    <p className="text-5xl">💰</p>
                    <p className="text-lg">
                        <p className="font-bold">Crypto Winnings:</p> Win and withdraw your earnings in cryptocurrency.
                    </p>
                </div>

                <div className="flex items-center">
                    <p className="text-5xl">🚀</p>
                    <p className="text-lg">
                        <p className="font-bold">Seamless Integration:</p>Connect your digital wallet and experience the future of poker effortlessly.
                    </p>
                </div>
                </div>

                <p className="text-xl mt-6">
                Ready to shuffle up and deal in the blockchain era? 🌐🃏 Join CryptoCardTables now and let the cards fall where they may! 🌟💰
                </p>
            </div>
            </div>

        </div>
    )
}



