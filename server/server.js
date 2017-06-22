const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const port = process.env.PORT || 3000

const {genMessage, genLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection',(socket)=>{
  console.log("connected to client");

  socket.on('disconnect',()=>{
    console.log("disconnected to server");
  })
  socket.emit('newMessage',genMessage("Admin","welcome to chat app"))

  socket.broadcast.emit('newMessage',genMessage("Admin","new user joined"))
  // newMessage
  socket.on('creatMessage',(msg, callback)=>{
    console.log(`created message ${JSON.stringify(msg)}`);
    io.emit('newMessage',genMessage(msg.from,msg.text))
    callback("This is from server")
    // socket.broadcast.emit('newMessage',{
    //   from:msg.from,
    //   text:msg.text,
    //   createdAt:new Date().getTime()
    // })
  })
  socket.on('createLocation',(coords)=>{
    io.emit('newLocationMessage',genLocationMessage("Admin",coords.latitude, coords.longitude))
  })


})




server.listen(port,()=>{
  console.log(`server is running at port ${port}`);
})
