import express from "express";
import { handelLoginForUser, handelSignupForUser } from "../controllers/user.js"
// import WelcomeMail from "../mail/mail.js";
import { routingToGame } from "./gameRoutes.js";

const router = new express.Router();

router.post("/signup",handelSignupForUser);

router.post("/login",handelLoginForUser);

router.post("/game",routingToGame);





export default router;