document.querySelector("#join").onclick = joinRoom;

document.querySelector("#sendRoom").onclick = sendMessageRoom;
document.querySelector("#send").onclick = send;
document.querySelector("#sendHelloWorld").onclick = sendMessage;
document.querySelector("#pms").onclick = sendpm;

socket.emit("join-room", "helloworld");


window.addEventListener("keypress", (e) => {
    const room = document.querySelector("#room")
    ? document.querySelector("#room").value
    : "";
    if (e.key === "Enter" && room) {
        if (document.querySelector("#messageGeneral") === document.activeElement ) sendMessage();
        if (document.querySelector("#messagePrivate") === document.activeElement ) sendMessageRoom();
        if (document.querySelector("#message") === document.activeElement ) send();
    }
    // if (e.key === 'Enter' && room) sendMessage()
});

document.querySelector("#messageGeneral").focus();