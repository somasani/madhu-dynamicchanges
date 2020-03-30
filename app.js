var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fs = require('fs');


const filePath = './sourceJSON.json';
var file = fs.readFileSync(filePath);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

fs.watchFile(filePath, (event, trigger) => {
    file = fs.readFileSync(filePath);
    console.log("The file now contains: \n" + file);
    io.sockets.emit('chat message', file.toString());
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});