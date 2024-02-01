// import React from 'react'

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

// import { Button } from "./ui/button";

const Rooms = () => {
  const navigate = useNavigate();
  const [ rooms, setRooms ] = useState();
  const userAddress = useAddress();
  const joinHandler = (address) => {
    if(!userAddress){
      alert("Wait and try again later..");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", address);
    urlencoded.append("userAddress", userAddress);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:2024/roomJoin", requestOptions)
      .then(response => response.text())
      .then(result => {
        const value = JSON.parse(result);
        if(value.status == 100){
          alert("Something went wrong...",value.msg);
        }
        else if(value.status == 200){
          //navigate to the room tab and you can move ahead.... there.....
          alert("Now to Navigate you to the room...");
        }
      })
      .catch(error => console.log('error', error));




    // return navigate(`room?roomToken=${roomToken}`);
  };
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:2024/allRooms", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(Object.values(JSON.parse(result)))
        setRooms(Object.values(JSON.parse(result)));
      })
      .catch(error => console.log('error', error));



  },[]);

  return (
    <section className="w-full relative h-full bg-background dark text-foreground">
      {" "}
      {/* Main Container */}
      <div className="p-4 flex flex-col gap-2 rounded-full">
        
      {rooms && rooms.map((element,index) => (
          <div
            key={index}
            className="p-4 bg-accent rounded-md flex justify-between "
          >
            <div className="flex flex-col">
              {" "}
              {/* Left Side */}
              <h3>Room Id: {element.contrctAddress}</h3>
              <p>{element.status}</p>
            </div>
            {/* right side */}
            <div className="h-full flex flex-col justify-center">
              <Button onClick={()=>{joinHandler(element.contrctAddress)}} className="px-10 text-lg" size="sm">
                Join
              </Button>
              <p className="self-end py-2 mr-2">{element.users.length}/6</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms;
