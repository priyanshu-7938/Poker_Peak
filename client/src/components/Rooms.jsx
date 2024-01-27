// import React from 'react'

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

// import { Button } from "./ui/button";

const Rooms = () => {
  const navigate = useNavigate();

  // when the user signs the room entry contract then the user is given is given with a unique id to enter the specific rooom
  const roomToken = 1232;

  const rooms = [1, 2, 3, 4]; //static rooms data

  const joinHandler = () => {
    return navigate(`room?roomToken=${roomToken}`);
  };

  return (
    <section className="w-full relative h-full bg-background dark text-foreground">
      {" "}
      {/* Main Container */}
      <div className="p-4 flex flex-col gap-2 rounded-full">
        {" "}
        {/* Rooms Container */}
        {rooms.map((id) => (
          <div
            key={id}
            className="p-4 bg-accent rounded-md flex justify-between "
          >
            <div className="flex flex-col">
              {" "}
              {/* Left Side */}
              <h3>Room {id}</h3>
              <p>---Contract Address---</p>
            </div>
            {/* right side */}
            <div className="h-full flex flex-col justify-center">
              <Button onClick={joinHandler} className="px-10 text-lg" size="sm">
                Join
              </Button>
              <p className="self-end py-2 mr-2">{id}/6</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms;
