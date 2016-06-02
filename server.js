var Boat = require('./boat');
var boat = new Boat();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/gamepad', function (req, res) {
  res.sendfile(__dirname + '/gamepad.html');
});


io.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });
  
  socket.on('data', function(data) {
    console.log('data', data);
    boat.forward(data.speed || 0);
    boat.turn(data.degree || 90);
  });
});