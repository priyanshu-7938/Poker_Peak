import express from "express";
import { handelLoginForUser, handelSignupForUser } from "../controllers/user.js"
// import WelcomeMail from "../mail/mail.js";
import { routingToGame } from "./gameRoutes.js";
import { creatingARoom } from "../controllers/room.js";
import User from "../models/user.js";

const router = new express.Router();

router.post("/signup",handelSignupForUser);

router.post("/login",handelLoginForUser);

router.post("/game",routingToGame);

router.post("/createroom",creatingARoom);

router.post("/userData",async (req,res) => {
    const user = await User.findByAddressValue(req.body.address);
    res.json(user.toJSON());
});


export default router;