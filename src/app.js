import express from "express";
import userRoute from "./routes/user.js";
import connectDB from "./db/mongoose.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(userRoute);

export default app;
