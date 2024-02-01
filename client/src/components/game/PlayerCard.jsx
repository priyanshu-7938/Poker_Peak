// import React from "react";
import { DollarSign } from "lucide-react";
import { Coins } from "lucide-react";

//todo :fetch the account balanve of userd form the blockchain...
const OtherPlayers = ({ name, address, avatar, isFolded }) => {
  return (
    <div className="relative max-w-[175px] max-h-[180px] z-0 py-2 px-4">
      {/* for blurry effect */}
      <div className="absolute inset-0 w-full h-full -z-10 backdrop-blr-sm"></div>{" "}
      {/* Added "top-0 left-0" to position the blurred div behind the main content */}
      <main className="flex flex-col z-10 items-center">
        <img
          className="w-1/2"
          src={avatar}
          alt="pairofcards"
        />
        <div className="w-full  py-1 font-semibold text-center rounded-md ">
          <p className="text-xl">{name}</p>
          <p className="text.md truncate bg-[#c197c8] p-1 rounded">{address}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* <h3 className="flex items-center text-[0.9rem]">
            <DollarSign className="mr-1" />
            {balance}
          </h3> */}
          {/* <h3 className="flex items-center text-[1.2rem]">
            <Coins className="mr-1" />
            Bet : <span className="font-medium ml-1 text-green-400"></span>
          </h3> */}
        </div>
      </main>
    </div>
  );
};

export default OtherPlayers;
