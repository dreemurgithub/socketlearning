const socket = io("ws://localhost:8080");
socket.on("messageGeneral", (text) => {
  const el = document.createElement("li");
  el.textContent = text;
  document.querySelector("#general").appendChild(el);
});
socket.on("messagePrivate", (text) => {
  const el = document.createElement("li");
  el.textContent = text;
  document.querySelector("#private").appendChild(el);
});

socket.on("messageGeneral", (message) => {
  const el = document.createElement("li");
  el.textContent = `${socket.id}: ${message}`;
  document.querySelector("#messageGeneral").appendChild(el);
});

document.querySelector("#messageGeneral").focus();

const sendMessage = () => {
  let message = document.querySelector("#messageGeneral").value;
  // alert(message)
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

const joinRoom = () => {
  const roomName = document.querySelector("#room")
    ? document.querySelector("#room").value
    : "";
  // socket.emit("join-room",{room,message:'join new room message'})
  // socket.send(JSON.stringify({type: 'joinRoom',room}))
  socket.emit("join-room", roomName);
  // return document.querySelector('#room').value

  // socket.joinRoom(e.target.value)
};

document.querySelector("#join").onclick = joinRoom;

document.querySelector("#send").onclick = sendMessageRoom;
document.querySelector("#sendHelloWorld").onclick = sendMessage;

window.addEventListener("keypress", (e) => {
  const room = document.querySelector("#room")
    ? document.querySelector("#room").value
    : "";
  if (e.key === "Enter" && room) {
    if (document.querySelector("#messageGeneral") === document.activeElement ) sendMessage();
    if (document.querySelector("#messagePrivate") === document.activeElement ) sendMessageRoom();
  }
  // if (e.key === 'Enter' && room) sendMessage()
});

socket.emit("join-room", "helloworld");

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }
