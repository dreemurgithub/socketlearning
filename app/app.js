
const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});
document.querySelector('input').focus()

const sendMessage = ()=>{
    let text = document.querySelector('input').value;
    if(text) socket.emit('message', text)
    document.querySelector('input').value = ''
}

document.querySelector('button').onclick = sendMessage
window.addEventListener('keypress',(e)=>{
    if (e.key === 'Enter') sendMessage()
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