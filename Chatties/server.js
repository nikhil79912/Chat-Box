const express = require('express');
const app = express();
const http = require('http').createServer(app);

http.listen(process.env.Port || 3000, () => {
    console.log("Listening on port " + (process.env.Port || 3000));
})
//static is a middleware of express framework which is used to make possible to access files like(css and javascript) for server.
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//--------------------------------------------socket setUp in server.js-------------------------------------------------------//
const io=require('socket.io')(http);//pass http server to socket so that socket know in which server socket have to work.
io.on('connection',(socket)=>{//when the browser or a client connected,this function call
    console.log('Connected')
     //message is name of event which is coming from client which is listen on server side.
    socket.on('message',(msg)=>{
         socket.broadcast.emit('message',msg)//send the message again to all the client except the client which send the message.
    })  
})  