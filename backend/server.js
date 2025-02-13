const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

let driverLocation = { lat: 0, lng: 0 };

io.on("connection", (socket) => {
  console.log("A driver connected:", socket.id);

  socket.on("updateLocation", (data) => {
    driverLocation = data;
    console.log("Updated location:", driverLocation);
    io.emit("locationUpdate", driverLocation); // Broadcast location
  });

  socket.on("disconnect", () => {
    console.log("Driver disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));

