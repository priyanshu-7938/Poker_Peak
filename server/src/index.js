import app from "./app.js";
// import dotenv from "dotenv";

const port = process.env.PORT ;
app.listen(port,()=>{console.log("Server started at:",port)});