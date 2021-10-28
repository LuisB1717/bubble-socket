var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// Conectar a base de datos

var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "Carlos Azaustre",
  },
];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");

  const userId = "001";
  
  socket.join(userId);
  
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data); 

    io.to(data.receiver).emit("messages", messages);

    // io.sockets.emit("messages", messages);
  });
});

server.listen(5300, function () {
  console.log("Servidor corriendo en http://localhost:5300");
});