import express from "express";
import Room from "../models/room.js";
import { RegisterForTheRoom } from "../controllers/room.js";
import User from "../models/user.js";
import { encryptWithPublicKey, decryptWithPrivateKey } from "../utils/cardDeck.js";
import { io } from "../app.js"
// import WelcomeMail from "../mail/mail.js";
const router = new express.Router();

router.post("/room", RegisterForTheRoom);
router.post("/allRooms/", async (req, res) => {
  const value = await Room.getAllRooms();
  console.log(value);
  res.json({ ...value });
});

router.post("/roomJoin", async (req, res) => {
  console.log(req.body);
  const contract = req.body.address;
  const userAddresss = req.body.userAddress;
  const room = await Room.findByAddressValue(contract);
  const user = await User.findByAddressValue(userAddresss);

  if (user === null || user === undefined) {
    return res.status(404).json({
      error: "please join the room with registered wallet adddress. "
    });
  }

  const retur = await room.addUser(user._id);
  // console.log(retur);
  switch (retur) {
    case "isin":
      res.json({ status: 201, msg: "allready existing account" });
      return;
    case "full":
      res.json({ status: 100, msg: "roomm is full." });
      return;
  }
  res.json({ ...retur, status: 200 });
});

router.post("/roomLeave", async (req, res) => {
  //checking if thr game is started then jus make the user fold else remove him.....
  // TODO: important....
  io.emit("update",{});
  console.log(req.body);
  const contract = req.body.address;
  const userAddresss = req.body.userAddress;
  const room = await Room.findByAddressValue(contract);
  const user = await User.findByAddressValue(userAddresss);
  const retur = await room.removeUser(user._id);
  res.json({ ...retur, status: 200 });

});

router.post("/fetchUsers", async (req, res) => {
  const contract = req.body.address;
  const room = await Room.findByAddressValue(contract);
  const retur = await room.allUsers();
  console.log("in fetch:", retur);
  res.json(retur);
});

router.post("/fetchCards", async (req,res)=>{
  //fetching cards.. here..
  // const pri = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnP7zYRvTZNBJX475pLnivqxv+NysRUbhhgX6Z9pPHxESNhTLJvlzYYLreN12dYjnOFwQA2Civ4XJA+tSplkP3nMSEAELr4FJryFZCylugRrmkoAkwJBEn2N/0vj75gnzC7Wbc14BxE3AyIjQ2PKuv1qEqD60um5OCfzQ02/PkNQIDAQAB-----END PUBLIC KEY-----";
  // const pub = ""

  // const encrypted = encryptWithPublicKey("hello",);
  const contractAddress = req.body.address;
  const userAddress = req.body.userAddress;
  const room = await Room.findByAddressValue(contractAddress);
  const user = await User.findByAddressValue(userAddress);
  const cards = await room.getUserCardsVisId(user._id);
  if(!cards){
    res.json({"status":100,"msg":"You not part of game bro!"});
  }
  res.json({"status":200, "cards": cards});
});

router.post("/fetchTabelCards", async (req,res)=>{
  const contractAddress = req.body.address;
  const room = await Room.findByAddressValue(contractAddress);
  switch(room.status){
    // enum: ['resting','firstloop','secondloop','thirdloop','ended'],
    case "resting":
      //meaning the cards not been displayed..
      res.json({"status":100,"msg":"game not started yet"});
      return;
    case "firstloop":
      const result = await room.getFirst3Cards();
      res.json({"status":200,"cards":result});
      return;
    case "secondloop":
      const result1 = await room.getFirst4Cards();
      res.json({"status":200,"cards":result1});
      return;
    case "thirdloop":
    case "ended":
      const result2 = await room.getFirst5Cards();
      res.json({"status":200,"cards":result2});
      return;
  }
  const cards = await room.getUserCardsVisId(user._id);
  if(!cards){
    res.json({"status":100,"msg":"You not part of game bro!"});
    return;
  }
  res.json({"status":200, "cards": cards});
});

router.post("/roomData",async (req,res)=>{
  const contractAddress = req.body.address;
  const room = await Room.findByAddressValue(contractAddress);
const dataToSend = await room.getSanitizedRoomInfo();
})

export default router;
