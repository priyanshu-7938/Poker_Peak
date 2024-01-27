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
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(userRoute);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const roomMessages = new Map();

io.on("connection", (socket) => {
  console.log(`User Connected :${socket.id}`);

  // socket.on("joinRoom", ({ roomName }) => {
  //   socket.join(roomName);
  //   socket.emit("message", { event: "you have joined the room !" });
  //   socket.broadcast
  //     .to(roomName)
  //     .emit("message", { event: `${socket.id} has joined the room.` });
  // });

  socket.on("joinRoom", ({ roomName }) => {
    // Create an empty array for storing messages if it doesn't exist
    console.log("roomName , ", roomName);
    if (!roomMessages.has(roomName)) {
      roomMessages.set(roomName, []);
    }
    // Join the room
    socket.join(roomName);
  });

  socket.on("leaveRoom", ({ roomName }) => {
    socket.leave(roomName);
    socket.emit("message", { event: "You have left the room." });
    socket.broadcast
      .to(roomName)
      .emit("message", { event: `${socket.id} has left the room.` });
  });

  socket.on("sendMessage", ({ roomName, message }) => {
    // Store the message in the array associated with the room
    roomMessages.get(roomName).push({ user: socket.id, message });
    // Emit the message to all users in the room
    io.to(roomName).emit("message", { user: socket.id, message });
    console.log("rooms : ", roomMessages);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

export default httpServer;
