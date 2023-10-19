const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
io.close(); // end all previous connection when server shutdown
const listId = [];
io.on("connection", (socket) => {
  listId.push(socket.id);
  socket.on("message", (message) => {
    socket.emit("message", message);
    socket.broadcast.emit("message", `${socket.id}: ${message}`);
  });
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    if (roomName !== "helloworld") {
      io.to(roomName).emit(
        "messagePrivate",
        `id: ${socket.id} - online list: ${JSON.stringify(listId)}`
      );
    } else {
      io.to(roomName).emit(
        "messageGeneral",
        `Server annouce: id: ${socket.id}  ${JSON.stringify(listId)} is online`
      );
    }
  });

  socket.on("messagePrivate", (message, room) => {
    io.to(room).emit(
      "messagePrivate",
      `room: ${room}: id:${socket.id},message: ${message}`
    );
  });
  socket.on("messageGeneral", (message) => {
    socket.broadcast.emit("messageGeneral", `${socket.id} said: ${message}`);
    socket.emit("messageGeneral", `You said: ${message}`);
  });
  socket.on("pm", ({ id, message }) => {
    // socket.to(id).emit(message); // wont work!
    io.to(id).emit("pm", { id, message });
  });
});

http.listen(8080, () => console.log("listening on http://localhost:8080"));

process.on("SIGINT", () => {
  console.log(" exit with Control C");
  io.close();
});

// The difference between socket.emit and io.emit lies in the scope of the emitted event and the clients it reaches.

// socket.emit:

// socket.emit is used to emit an event from an individual client to the server or from the server to a specific client.
// It sends the event only to the specific socket (client) associated with the socket object on which it is called.
// Other clients connected to the server will not receive the emitted event.
// io.emit:

// io.emit is used to emit an event from the server to all connected clients.
// It sends the event to all connected sockets (clients) that are currently connected to the server.
// All clients, including the one that triggered the event, will receive the emitted event.
// In summary, socket.emit is used for one-to-one communication between a specific client and the server, while io.emit is used for one-to-many communication, broadcasting an event to all connected clients.
