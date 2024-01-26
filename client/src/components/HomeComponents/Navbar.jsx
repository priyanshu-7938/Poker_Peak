// import React from "react";
import logo from "../../assets/logo.png";
import logout from "../../assets/logout.png";
import rupee from "../../assets/rupee.png";
import { useTheContext } from "../../context";
import { ConnectWallet } from "@thirdweb-dev/react";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fullScreenState } from "@/atoms/triggers";

export default function Navbar() {
  const { userData, setUserData } = useTheContext();
  const Navigate = useNavigate();
  const FullScreenTrigger = useRecoilValue(fullScreenState);

  const logoutHandler = () => {
    setUserData(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className={` ${!FullScreenTrigger && "hidden"} h-[50px] flex justify-between py-4 pb-6 border-b border-gray-600`}>
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center">
            <img src={logo} className="h-[40px]" alt="" />
          </div>
          <p className="text-2xl font-goudy italic font-bold">Poker Peak</p>
        </div>
        {/* stuff of users.. */}
        <div className="flex mx-2 gap-4">
          <div className="flex gap-1 items-center">
            <img src={rupee} className="h-[30px]" alt="" />
            <div className="flex flex-col">
              <p className="text-1xl bg-[#979797] rounded-[10px] p-1 flex truncate w-[100px] justify-between">
                ₹ {userData?.userInfo?.pooledMoney}
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    Navigate("addmoney");
                  }}
                >
                  ➕
                </p>
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <img src={userData?.userInfo?.avatar} className="h-[30px]" alt="" />
            <div className="flex flex-col">
              <p>{userData?.userInfo?.name}</p>
              <div className="h-[3px] rounded-[10px] bg-[#3f3f3f]"></div>
            </div>
          </div>
            <ConnectWallet
              switchToActiveChain={true}
              displayBalanceToken={{
                [LightlinkPegasusTestnet.chainId]:
                  "0x89CCf46D641F30E6D04833f1352D6b2DD40c6E12"
              }}
              theme="light"
            />
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={logoutHandler}
          >
            <img src={logout} className="h-[70%]" alt="" />
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

// token
// userInfo
// admin
// avatar
// createdAt
// email
// kyc
// name
// phoneNo
// pooledMoney
// token
// updatedAt
// verified
// __v
// _id
