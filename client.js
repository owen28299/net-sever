var net = require('net');

var outputMessage = "";

var input_method = process.argv[2];
var input_host = process.argv[3];
var input_uri = process.argv[4];
var port = 80;

if(process.argv[5] !== undefined){
  port = process.argv[5];
}

function requestHeader(method, uri, host) {
  return method + " " + uri + " HTTP/1.1" + "\r\n" +
  "Date: " + new Date() + "\r\n" +
  "Host: " + host + "\r\n" +
  "User-agent: client.js" + "\r\n\r\n";
}

var socket = net.createConnection(port, input_host, function(){
  socket.write(requestHeader(input_method, input_uri, input_host));
});

socket.on('data',function(data){
  outputMessage += (data.toString());
  socket.end();
});

socket.on('end', function(){
  console.log(outputMessage);
});