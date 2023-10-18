
const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

socket.on('messagePrivate', ({text,room}) => {

    const el = document.createElement('li');
    el.innerHTML = `${room}: ${text}`;
    document.querySelector('ul').appendChild(el)

});

document.querySelector('#message').focus()

const sendMessage = ()=>{
    let text = document.querySelector('#message').value;
    if(text) socket.emit('message', text)
    document.querySelector('#message').value = ''
}

const sendMessageRoom = ()=>{
    const room = document.querySelector('#room') ? document.querySelector('#room').value : ''
    let message = document.querySelector('#message').value;
    if(message) socket.emit('messagePrivate', {message,room})
    document.querySelector('#message').value = ''
}


const joinRoom = () =>{
    const room = document.querySelector('#room') ? document.querySelector('#room').value : ''
    console.log(room)
    socket.emit("join-room",{room,message:'join new room message'})
    // return document.querySelector('#room').value

    // socket.joinRoom(e.target.value)
}

document.querySelector('#join').onclick = joinRoom

document.querySelector('#send').onclick = sendMessageRoom
window.addEventListener('keypress',(e)=>{
    const room = document.querySelector('#room') ? document.querySelector('#room').value : ''
    if (e.key === 'Enter' && room) sendMessage()
})


// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }