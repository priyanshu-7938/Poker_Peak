import React from "react";
import { Button } from "../ui/button";

const User = () => {
  return (
    <div className="w-[400px] max-w-[600px] p-2 px-4 max-h-[600px]">
      <div className="flex flex-col items-center gap-2 justify-center">
        <div className="flex gap-2">
          {" "}
          {/* user */}
          <h2>Player 1</h2>
          <img src="image" alt="user" />
        </div>
        <div className="flex space-x-2 p-2 rounded-md"> {/* Buttons */}
          <Button className="border-r border-ring px-2">Call</Button>
          <Button className="border-r border-ring px-2">Fold</Button>
          <Button className="px-2">Raise</Button>
              </div>
              <div> {/* Cards */}
                  
              </div>
      </div>
    </div>
  );
};

export default User;
