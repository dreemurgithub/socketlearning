const socket = io("ws://localhost:8080");

const sendMessage = () => {
  let message = document.querySelector("#messageGeneral").value;
  if (message) socket.emit("messageGeneral", message, "helloworld");
  document.querySelector("#messageGeneral").value = "";
};

const sendMessageRoom = () => {
  const room = document.querySelector("#room")
    ? document.querySelector("#room").value
    : "";
  let message = document.querySelector("#messagePrivate").value;
  if (message) socket.emit("messagePrivate", message, room);
  document.querySelector("#messagePrivate").value = "";
};

const send = () => {
  let message = document.querySelector("#message").value;
  if (message) socket.emit("message", message);
  document.querySelector("#message").value = "";
};
const sendpm = () => {
  const id = document.querySelector("#socketId").value;
  const message = document.querySelector("#pm").value;
  socket.emit("pm",{id,message});
};

const joinRoom = () => {
  const roomName = document.querySelector("#room")
    ? document.querySelector("#room").value
    : "";
  socket.emit("join-room", roomName);
};

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }
