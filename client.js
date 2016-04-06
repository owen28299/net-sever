var net = require('net');

var input = "index.html";
var outputMessage = "";


var socket = net.createConnection(8080, function(){
  socket.write("GET /" + input + " HTTP/1.1");
});

socket.on('data',function(data){
  outputMessage += (data.toString());
});

socket.on('end', function(){
  console.log(outputMessage);
});