const socket = io('https://chat-serer-ravymzspk-utkarshsaini19.vercel.app');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")


// Audio that will play on receiving messages
const notify = new Audio('../ting.mp3')

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        notify.play();
    }
}


// Ask new user for his/her person and let the server know
console.log("Hello");
const person = prompt("Enter your person to join");
socket.emit('new-user-joined', person);

// If a new user joins, receive his/her person from the server
socket.on('user-joined', person =>{
    append(`${person} joined the chat`, 'left')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    console.log("Inside On Receive");
    append(`${data.person}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', person =>{
    append(`${person} left the chat`, 'left')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    console.log("Inside Event Listener");
    messageInput.value = ''
})