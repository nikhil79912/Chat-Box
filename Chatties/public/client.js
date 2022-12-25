const socket = io();
let nameOfuser;
let textArea = document.querySelector('#textarea'); //import textArea from html file
let messageArea = document.querySelector('.message_area'); //import messageArea from html file
do {
    nameOfuser = prompt('Please enter your name') //prompt is used to take input of type string in javascript.
} while (!nameOfuser)

textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})
//send message to the server with username 
function sendMessage(message) {
    let msg = {
        user: nameOfuser,
        message: message.trim()
    }

    //Append the outgoing message first in message section of talkrr app after that send to the server
    appendMessage(msg, 'outgoing')
    //after append the message clear the textarea as empty
    textArea.value = '';
    //scrollToBottom will automatically scroll the message to bottom 
    scrollToBottom();

    //send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div') //we pass div of message_area class of html file
    let className = type; //type tells the type of message either it is incoming or outgoing
    mainDiv.classList.add(className, 'message')
    //this is html markup so we have to pass this to in maindiv
    let markUp = `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
       `
    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
}
//receive the message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming') //append the received message in message section of talkrr app
    scrollToBottom();
})

//Create a function which scroll the message to bottom.
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}