const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const professionsRoutes = require("./routes/professions");
const handleSocket = require("./socket/matchmaking");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use("/api/professions", professionsRoutes);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    handleSocket(io, socket);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});