import React,{ useState } from "react";
import Avatar from "../utils/Avatar";
// import { useWeb3Context } from "../ThirdWebContext";
// import { ConnectWallet } from "@thirdweb-dev/react";

export default function Signup(){
    // const {  address } = useWeb3Context();

    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ rePassword, setRePassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ avatar, setAvatar ] = useState("https://avataaars.io/");
    const [ phone, setPhone ] = useState("");


    //adding address from thirdwebbb

    //function
    const handelEmail = (event) => {
        setEmail(event.target.value);
    }
    const handelName = (event) => {
        setName(event.target.value);
    }
    const handelPass = (event) => {
        setPassword(event.target.value);
    }
    const handelRePass = (event) => {
        setRePassword(event.target.value);
    }
    const handelPhone = (event) => {
        setPhone(event.target.value);
    }



    return (
        <>
            <div className="h-screen flex flex-col gap-1 items-center justify-center">
                <div className="bg-[#f7eee1] w-[50%] p-5 px-6 shadow-md rounded-t-[30px]">
                    <p className="text-4xl font-bold font-goudy">Sign Up</p>
                    <div className="flex justify-between m-2">
                        <div className="flex flex-col w-[50%]">
                            <p className="text-2xl  font-goudy font-bold">Name</p>
                            <input type="text" value={name} placeholder="Kamlesh Kumar" onChange={handelName}
                                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                            />
                            
                            <p className="text-2xl font-goudy font-bold">Email</p>
                            <input type="text" value={email} placeholder="example@domain.com" onChange={handelEmail}
                                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                            />

                            <p className="text-2xl  font-goudy font-bold">Phone</p>
                            <input type="text" value={phone} placeholder="+xx xxx-xxx-xxxx" onChange={handelPhone}
                                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                            />
                            
                            <p className="text-2xl  font-goudy font-bold">Password</p>
                            <input type="text" value={password} placeholder="Kamlesh Kumar" onChange={handelPass}
                                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                            />

                            <p className="text-2xl  font-goudy font-bold">Re-Password</p>
                            <input type="text" value={rePassword} placeholder="Kamlesh Kumar" onChange={handelRePass}
                                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                            />

                            <button className="bg-[#F4DFC8] mt-5 p-1 rounded-[20px] font-bold flex gap-2 items-center justify-center"><p className="text-3xl">🦭</p>Register...</button>
                        </div>
                        <div className="flex items-center justify-center">
                            <Avatar 
                                avatar={avatar}
                                setAvatar={setAvatar}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-[#f7eee1] w-[50%] p-5 px-6 shadow-md rounded-b-[30px]">
                    {/* <ConnectWallet/> */}
                    <p>hello</p>
                </div>
            </div>
        </>
    )
}

