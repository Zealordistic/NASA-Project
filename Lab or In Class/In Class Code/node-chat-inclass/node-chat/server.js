// IMPROVEMENTS:
// 1) improve screen when there are too many messages
// 2) add a reset button
// 3) add timestamps 
// 4) there is a null value when you don't set your nickname
// 5) share weather to everyone

// server init + mods
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios').default;
var mongoose = require('mongoose');

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/getInfo', function (req, res) {
  axios.get("https://api.openweathermap.org/data/2.5/weather?lat=42.72&lon=-73.69&appid=da4394fa59bda67200c24d680813c377"
  ).then(response => {
    var result = response.data;
    res.json(result);
  })
});



// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://localhost/mychat');

// mongodb schemas
var chatMessage = new mongoose.Schema({
  username: String,
  message: String
});
var Message = mongoose.model('Message', chatMessage);

// user connected even handler
io.on('connection', function(socket){
  
  // log & brodcast connect event
  console.log('a user connected');
  
  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  // message received event handler
  socket.on('message', function(msg){
    // log chat msg
    console.log('message: ' + msg);
    
    // broadcast chat msg to others
    socket.broadcast.emit('message', msg);
    
    // save message to db
    var message = new Message ({
      message : msg
    });
    message.save(function (err, saved) {
      if (err) {
	return console.log('error saving to db');
      }
    })
  });
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});