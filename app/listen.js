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

socket.on("message", (message) => {
  const el = document.createElement("li");
  el.textContent = message;
  document.querySelector("#all").appendChild(el);
});

socket.on("pm", ({ id, message }) => {
  const el = document.createElement("li");
  el.textContent = `${id}: ${message}`;
  document.querySelector("#sms").appendChild(el);
});
