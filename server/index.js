const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log(message)
    // io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    io.emit("message",`${socket.id.substr(0, 2)} said ${message} `)
});
  socket.on("join-room",({message,room})=>{
    // console.log(room)
    io.emit("message",`welcome to room: ${room}, message is: ${message}`)
  })
  socket.on("messagePrivate", ({message,room}) => {
    console.log({message,room})
    // io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    io.to(room).emit("message",`room ${room}: ${socket.id.substr(0, 2)} said ${message} `)
});
});


http.listen(8080, () => console.log("listening on http://localhost:8080"));

// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });
