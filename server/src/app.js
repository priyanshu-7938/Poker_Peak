import express from "express";
import userRoute from "./routes/user.js";
import connectDB from "./db/mongoose.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
dotenv.config();



const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(userRoute);


const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors:{
    origin:"http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

io.on("connection",(socket)=>{
  console.log(`User Connected :${socket.id}`);
  socket.on("message",(data)=>{
    console.log(data?.event);
    socket.broadcast.emit("recieve_message",{...data});
  });
})


// io.on("message", (socket) => {
//   // ...
//   console.log("Socket: "+socket.id +" "+ socket);
// });


export default httpServer;



