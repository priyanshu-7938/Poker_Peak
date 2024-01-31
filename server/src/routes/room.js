import express from "express";
import { RegisterForTheRoom } from "../controllers/room.js"
// import WelcomeMail from "../mail/mail.js";
const router = new express.Router();

router.post("/room",RegisterForTheRoom);


export default router;