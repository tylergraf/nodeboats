var Boat = require('./boat');
var boat = new Boat();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('forward', function(data) {
    console.log('forward');
    boat.forward(50);
  });

  socket.on('stop', function(data) {
    console.log('forward');
    boat.stop();
  })
});