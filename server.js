const express = require("express");
const app = express();
// Creates server based on express server
const server = require("http").Server(app);
// Passes server to socket.io
const io = require("socket.io")(server);
// Gets randomly generated id
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

// Runs anytime users connects to webpage, server side event listeners
io.on("connection", (socket) => {
  socket.on("join-room", roomId, userId);
});
server.listen(3000);
