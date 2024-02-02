import express from "express";
import Room from "../models/room.js";
import { RegisterForTheRoom } from "../controllers/room.js"
import User from "../models/user.js";
// import WelcomeMail from "../mail/mail.js";
const router = new express.Router();

router.post("/room",RegisterForTheRoom);
router.post("/allRooms/",async (req,res) => {
    const value = await Room.getAllRooms();
    console.log(value);
    res.json({...value});
});

router.post("/roomJoin",async (req,res) => {
    console.log(req.body);
    const contract = req.body.address;
    const userAddresss = req.body.userAddress;
    const room = await Room.findByAddressValue(contract);
    const user = await User.findByAddressValue(userAddresss);
    const retur = await room.addUser(user._id);
    // console.log(retur);
    switch(retur){
        case "isin":
            res.json({"status":201,"msg":"allready existing account"});
            return;
        case "full":
            res.json({"status":100,"msg":"roomm is full."});
            return;
    }
    res.json({...retur, "status":200});
});
router.post("/roomLeave",async (req,res) => {
    //if the room in not the state of resting then jus fold the user instead of removing it.....
    console.log(req.body);
    const contract = req.body.address;
    const userAddresss = req.body.userAddress;
    const room = await Room.findByAddressValue(contract);
    const user = await User.findByAddressValue(userAddresss);
    let retur;
    if(room.status !== "resting" ){
        ///meaing jus fold the user via the id...
        retur = await room.foldUserByAddress(userAddresss);
    }
    else{
        retur = await room.removeUser(user._id);
    }
    res.json({...retur, "status":200});
});

router.post("/fetchUsers",async (req,res) => {
    const contract = req.body.address;
    const room = await Room.findByAddressValue(contract);
    const retur = await room.allUsers();
    console.log("in fetch:",retur);
    res.json(retur);
});




export default router;