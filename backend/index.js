const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

const socket = require("socket.io");

mongoose.connect("mongodb+srv://mgiorgio4:chatsgg@chatsgg.q1wfyzl.mongodb.net/chatsgg");
const db = mongoose.connection;
db.once("open", () => {console.log("DB connected...")});

const app = express();
app.use(cors());
app.use(express.json()); //middleware per restituire json

app.use("/api/authentication", userRoutes);
app.use("/api/friends", userRoutes);
app.use("/api/messages", messagesRoutes);

const server = app.listen(4000, () => {console.log("Server listening on port 4000...")});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

io.on("connection", (socket) => {
    socket.join("room1"); //aggiungo il socket dell'utente conesso alla stanza 
    socket.on("send-msg", (data) => {
        socket.to("room1").emit("msg-receive", data);
    });
  });
