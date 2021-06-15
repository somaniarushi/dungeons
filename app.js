var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('change', (loc) => {
    socket.broadcast.emit('change', loc);         
    //sending message to all except the sender
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on :3000');
});


