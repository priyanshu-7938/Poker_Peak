import { useEffect } from "react";
// import { useSocketContext } from "../socketContext";
// import { socket } from "../socket";
// import useSocketSetupForRoom from "../socketUtils/useSocketSetupForRoom";
import { Navigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fullscreen, Shrink } from "lucide-react";
import PlayerCard from "@/components/game/PlayerCard";
import { useRecoilState } from "recoil";
import { fullScreenState } from "@/atoms/triggers";
import useSocket from "@/hooks/useSocket";
import Chats from "@/components/game/Chats";
import { Toaster, toast } from "sonner";

export default function Room() {
  // const [message, setMessage] = useState("");
  // const { emitMessage } = useSocketContext();
  const [params] = useSearchParams();
  const roomToken = params.get("roomToken");
  const [FullScreenTrigger, setFullScreenTrigger] =
    useRecoilState(fullScreenState);

  const socket = useSocket();

  useEffect(() => {
    socket.emit("joinRoom", { roomName: roomToken });

    socket.emit("message", (msg) => {
      console.log(`New message received: ${msg}`);
      
    });

  }, [socket]);

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomName: roomToken });
    toast("You left the room !");
  };
  // const sendMessage = () => {
  //   emitMessage("helo");
  //   console.log("emmited");
  // };
  // useSocketSetupForRoom();

  if (!roomToken) {
    return <Navigate to="/home/rooms" />;
  }

  const fullScreenHandler = () => {
    setFullScreenTrigger((prev) => !prev);
  };

  const players = [
    { name: "Player 1", balance: 2029, bet: 19 },
    { name: "Player 2", balance: 1500, bet: 15 },
    { name: "Player 3", balance: 2500, bet: 20 },
    { name: "Player 4", balance: 1200, bet: 12 },
    { name: "Player 5", balance: 1100, bet: 10 },
    { name: "Player 6", balance: 100, bet: 100 }
  ];

  return (
    <main className="w-full h-full bg-gradient-to-tr from-[#8b0000c7] via-[#580101] to-[#8B0000]  rounded-md">
      <Toaster />
      {/* Chat Application */}
      <div className='absolute bottom-2 right-0 z-10'>
        <Chats roomName={roomToken} />
      </div>
      {/* Container */}
      <div className="z-0 pt-7 px-7 pb-2 flex flex-col h-full w-full justify-between">
        {/* upper side */}
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">RoomId : {roomToken}</h1>
          <Button
            onClick={fullScreenHandler}
            variant="destructive"
            className="text-red-100 relative -top-5"
          >
            {FullScreenTrigger ? (
              <>
                Enter FullScreen
                <Fullscreen className="ml-3" />
              </>
            ) : (
              <>
                Exit FullScreen
                <Shrink className="ml-3" />
              </>
            )}
          </Button>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Players : {"3/6"}</h3>
            <Button
              onClick={leaveRoom}
              variant={"secondary"}
              className="bg-red-700"
            >
              Leave
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        {/* Table Image Div */}
        <div className="flex flex-wrap relative w-full m-auto max-w-[1100px]">
          <img className="w-full" src={"/assets/table-nobg.svg"} alt="table" />
          <div className="absolute top-[20%] left-[45%] flex flex-col items-center gap-2">
            <img src="/assets/pot.svg" alt="pot" className="max-w-[75px]" />
            <h2 className="font-bold text-white text-[2.4rem]">$9023</h2>
          </div>
          {/* players */}
          <div
            className="absolute w-full h-[73%]
            -bottom-8 flex items-end  space-x-10"
          >
            {players.map((player, index) => (
              <div
                key={index}
                className={`w-1/2 md:w-1/6 lg:w-1/6 p-2 ${`${
                  index === 0
                    ? "absolute  top-0 left-4"
                    : index === 4
                    ? "absolute top-0 right-3"
                    : index === 3
                    ? "relative left-[20%] "
                    : index === 5
                    ? "absolute left-[40%] mb-[40px] border rounded-md border-black"
                    : ""
                }`}`}
              >
                <PlayerCard {...player} />
              </div>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex self-center items-center space-x-3 pb-4">
          <Button
            size="lg"
            className="px-14 border border-black text-gray-900 rounded-full bg-red-500 "
          >
            Fold
          </Button>
          <Button
            size="lg"
            className="px-14 border border-black text-gray-900 rounded-full bg-green-600 "
          >
            Call
          </Button>
          <Button
            size="lg"
            className="px-14 border border-black text-gray-900 rounded-full bg-[#FFDA49]"
          >
            Raise
          </Button>
        </div>
        <p>new player joining....</p>
      </div>
    </main>
  );
}
