import { useEffect, useState } from "react";
// import { useSocketContext } from "../socketContext";
// import { socket } from "../socket";
// import useSocketSetupForRoom from "../socketUtils/useSocketSetupForRoom";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { message } from "react-message-popup";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fullscreen, Shrink } from "lucide-react";
import PlayerCard from "@/components/game/PlayerCard";
import { useRecoilState } from "recoil";
import { fullScreenState } from "@/atoms/triggers";
import useSocket from "@/hooks/useSocket";
import Chats from "@/components/game/Chats";
import { Toaster, toast } from "sonner";
import { useAddress } from "@thirdweb-dev/react";

export default function Room() {
  // const [message, setMessage] = useState("");
  // const { emitMessage } = useSocketContext();
  const [params] = useSearchParams();
  const roomToken = params.get("roomToken");
  const [loading, setLoading] = useState(true);
  const [FullScreenTrigger, setFullScreenTrigger] =
    useRecoilState(fullScreenState);
  const userAddress = useAddress();
  const navigate = useNavigate();
  const socket = useSocket();

  //game Status mainntaining...
  const [stateOfGame, setStateOfGame] = useState("resting");
  const [theCurrentBet, setTheCurrentBet] = useState(0);
  const [theUserCards, setTheUserCards] = useState();
  const [theTabelCards, setTheTabelCards] = useState();
  const [thePoolAmount, setThePoolAmount] = useState(0);
  const [theExpectedPlayer, setExpectedPlayer] = useState();
  const [players, setPlayers] = useState();

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);


  useEffect(() => {
    socket.on("testingEvent", () => {
      alert("i got the event Baby....");
    });

    socket.on("update", () => {
      fetchTHeUsers();
    });

    // io.emit("UserFoldedWithReason",{
    //     reason: data.data.reason,
    //     addressToFOld: data.data.foldAddress,
    //     users: room.users,
    // });
    socket.on("UserFoldedWithReason", (data) => {
      message.info(data.addressToFOld + " folded,Reason:" + data.reason, 2000);
      fetchTHeUsers();
    });

    // io.emit("betRaised",{
    //     currentBet:data.data.raisedTo,
    //     currentPool:data.data.currentPot,
    //     expectedUser: data.data.nextUser,
    //     raisedByAddress:raiserAddress,
    // })
    socket.on("betRaised", (data) => {
      setTheCurrentBet(data.currentBet);
      setThePoolAmount(data.currentPool);
      setExpectedPlayer(data.expectedUser);
      message.info("The bet was raised to  " + data.currentBet + "$!", 3000);
    });

    //io.emit("betCalled",{
    //     currentBet:data.data.raisedTo,
    //     currentPool:data.data.currentPot,
    //     expectedUser: data.data.nextUser,
    //     raisedByAddress:raiserAddress,
    // })
    socket.on("betCalled", (data) => {
      setThePoolAmount(data.currentPool);
      setExpectedPlayer(data.expectedUser);
      setTheCurrentBet(data.currentBet);
      message.info("The Bet was Called", 2000);
    });

    //io.emit("deckPost",{
    //  "status":200,
    //  "msg":"deck was posted.",
    //});
    socket.on("deckPost", () => {
      message.info("The deck is distributed..!!", 500);
    });

    // io.emit("pKeyExposed",{
    //   "status":200,
    //   "msg":"PkeyIsExposed",
    // });
    socket.on("pKeyExposed", () => {
      message.info("The pivate Key is Posted on contract!");
    });

    // io.emit("StateDiscloser",{
    //   "status":data.data.stateTransitationTo,
    //   "msg":"Status was updated",
    // });
    socket.on("StateDiscloser", (data) => {
      //run the cards fetcher...
      fetchTheUserCards();
      setStateOfGame(data.status);
    });

    // io.emit("RandomNumberGenerated",{
    //   "status":200,
    //   "msg":"Deck was poseted.",
    // });
    socket.on("RandomNumberGenerated", () => {
      // do some stuff here too...
    });

    socket.emit("joinRoom", { roomName: roomToken });

    socket.emit("message", (msg) => {
      console.log(`New message received: ${msg}`);
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [socket]);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    //TODO: add fetchRoomState....

    fetchTHeUsers();
    fetchTheUserCards();
    fetchTheTabelCards();
  }, []);
  useEffect(() => {
    // ['resting','firstloop','secondloop','thirdloop','ended'],
    if (stateOfGame === "resting") return;
    fetchTheTabelCards();
  }, [stateOfGame]);

  useEffect(() => {
    console.log(players);
  }, [players]);

  const fetchTheUserCards = () => {
    if (!userAddress) {
      return;
    }
    if (stateOfGame === "resting") {
      console.log("cant fetch Cards ,game not started yet...");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", roomToken);
    urlencoded.append("userAddress", userAddress);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:2024/fetchCards", requestOptions)
      .then((response) => response.text())
      .then((result) => setTheUserCards(JSON.parse(result).cards))
      .catch((error) => console.log("error", error));
  };
  const fetchTheTabelCards = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", roomToken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:2024/fetchTabelCards", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === 100) return;
        setTheTabelCards(res.cards);
      })
      .catch((error) => console.log("error", error));
  };
  const fetchTHeUsers = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", roomToken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:2024/fetchUsers", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPlayers(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  const leaveRoom = () => {
    if (!userAddress || !roomToken) {
      alert("Try again later...");
      return;
    }
    socket.emit("leaveRoom", { roomName: roomToken });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", roomToken);
    urlencoded.append("userAddress", userAddress);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:2024/roomLeave", requestOptions)
      .then((response) => response.text())
      .then((result) => navigate("/home/rooms"))
      .catch((error) => console.log("error", error));
  };
  // const sendMessage = () => {
  //   emitMessage("helo");
  //   console.log("emmited");
  // };
  // useSocketSetupForRoom();

  console.log("players : ", players);

  if (loading) {
    return (
      <img
        src="/assets/spinner.svg"
        className="m-auto bg-black"
        alt="loading...."
      />
    );
  }

  if (!roomToken) {
    return <Navigate to="/home/rooms" />;
  }

  const fullScreenHandler = () => {
    setFullScreenTrigger((prev) => !prev);
  };

  return (
    <main className="w-full h-[100vh] bg-gradient-to-tr from-[#8b0000c7] via-[#580101] to-[#8B0000]  rounded-md">
      <Toaster />
      {/* Chat Application */}
      <div className="absolute bottom-2 right-2 z-10">
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
            <h3 className="text-xl font-medium">
              Players :{players && " " + players.length}/6
            </h3>
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
        <div className={`flex flex-wrap relative w-full max-h-max m-auto max-w-[1100px] ${screenHeight < 800 && 'h-[470px] mb-10' }`}>
          <img className="w-full h-full" src={"/assets/table-nobg.svg"} alt="table" />
          <div className="absolute top-[20%] left-[45%] flex flex-col items-center gap-2">
            <img src="/assets/pot.svg" alt="pot" className="max-w-[75px]" />
            <h2 className="font-bold text-white text-[2.4rem]">$9023</h2>
          </div>
          {/* players */}
          <div
            className="absolute w-full h-[73%] 
            -bottom-8 flex items-end  space-x-10"
          >
            {players &&
              players.map((player, index) => (
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
                  <PlayerCard {...player} cards={theUserCards} />
                </div>
              ))}
          </div>
        </div>
        {/* Buttons */}
        <div className={`flex self-center items-center space-x-3 pb-4 ${screenHeight < 800 && 'pb-0' }`}>
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
        <p>{"player 1 turn"}</p>
      </div>
    </main>
  );
}
