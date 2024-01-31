import express from "express";
import { handelLoginForUser, handelSignupForUser } from "../controllers/user.js"
// import WelcomeMail from "../mail/mail.js";
import { routingToGame } from "./gameRoutes.js";
import { creatingARoom } from "../controllers/room.js";

const router = new express.Router();

router.post("/signup",handelSignupForUser);

router.post("/login",handelLoginForUser);

router.post("/game",routingToGame);

router.post("/createroom",creatingARoom);


export default router;