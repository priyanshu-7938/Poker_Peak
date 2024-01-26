// import React from "react";
import { DollarSign } from "lucide-react";
import { Coins } from "lucide-react";

const OtherPlayers = ({ name, balance, bet }) => {
  return (
    <div className="relative max-w-[175px] z-0 p-4">
      {/* for blurry effect */}
      <div className="absolute inset-0 w-full h-full -z-10 backdrop-blr-sm"></div>{" "}
      {/* Added "top-0 left-0" to position the blurred div behind the main content */}
      <main className="flex flex-col z-10 gap-1 items-center">
        <img
          className="w-1/2"
          src={"/assets/pairofcards.png"}
          alt="pairofcards"
        />
        <div className={`w-full border border-black py-1 bg-[#C90000] font-semibold text-center rounded-md `}>
          {name}
        </div>
        {/* users balance and bet */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="flex items-center text-[0.9rem]">
            <DollarSign className="mr-1" />
            {balance}
          </h3>
          <h3 className="flex items-center text-[1.2rem]">
            <Coins className="mr-1" />
            Bet : <span className="font-medium ml-1 text-green-400">{bet}</span>
          </h3>
        </div>
      </main>
    </div>
  );
};

export default OtherPlayers;
