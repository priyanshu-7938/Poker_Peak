import React,{ useState} from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains"


import Loading from "../utils/Loading"
import { useTheContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const address = useAddress();
    const Navigate = useNavigate();

    const { setUserData } = useTheContext();
    
    const [ password, setPassword ] = useState("");
    const [ load, setLoad ] = useState(false);


    const handelPassword = (event)=>{
        setPassword(event.target.value)
    }

    const Handelogin = ()=>{
        if(!password){
            message.error("Enter Password",1000);
            return;
        }
        if(!address){
            message.error("Connect wallet",2000);
            return;
        }
        setLoad(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("address", address);
        urlencoded.append("password", password);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:2024/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(JSON.parse(result)?.status === "succesfull"){
                message.success("Logged in!!");
                setUserData(JSON.parse(result)?.data);
                console.log(JSON.parse(result)?.data);
                Navigate("/home/dashboard");
            }
            else{
                console.log(result);
            }
            setLoad(false);
        })
        .catch(error => {
            console.log('error', error)
            setLoad(false);
        });

    }

    return (
        <>
            <div className="h-screen flex flex-col gap-1 items-center justify-center">
                <div className="bg-[#f7eee1] w-[50%] p-5 px-6 shadow-md rounded-[30px]">
                    <p className="text-4xl font-bold font-goudy">Log In</p>
                    
                    
                    <div className="m-2">
                        <div className="flex flex-col gap-3">
                            <ConnectWallet 
                                switchToActiveChain={true}
                                displayBalanceToken={{
                                    [LightlinkPegasusTestnet.chainId]: "0x89CCf46D641F30E6D04833f1352D6b2DD40c6E12",
                                }}
                                theme="light"
                            /> 
                            {address &&
                                <>
                                    <p className="text-2xl  font-goudy font-bold">Password</p>
                                    <input type="password" value={password} placeholder="" onChange={handelPassword}
                                        className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                                    />
                                    <div className="flex gap-2">
                                        <button className="bg-[#F4DFC8] w-[70%] mt-5 p-1 rounded-[20px] font-bold flex gap-2 items-center justify-center" onClick={Handelogin}><p className="text-3xl">🐻‍❄️</p>Validate..</button>
                                        <button className="bg-[#ebdccb] w-[30%] mt-5 p-1 rounded-[20px] font-bold flex items-center justify-center" onClick={()=>{Navigate("/signup")}}><p className="text-3xl">🐻</p>Sign up</button>
                                    </div>
                                </>
                            }


                        </div>
                    </div>
                </div>
            </div>
            {load && <Loading/>}
        </>
    )
}