'use strict';

var net = require('net');
var fs = require('fs');


function returnHeader(length, type, status) {
  return `HTTP/1.1 ` + status  +
`
Server: nginx/1.4.6 (Ubuntu)
Date:` + new Date() + `
Content-Type:` + type + `; charset=utf-8
Content-Length:` + length +
`
Connection: keep-alive

`;
}

var server = net.createServer(function(request){
  request.on('data', function(data){
    var requestHeader = data.toString().split(" ");
    var path = "." + requestHeader[1];

    if(path === "./"){
      path = "./index.html";
    }

    fs.readFile(path, 'utf8', function(error, data){

      if(error){
        fs.readFile("./404.html", 'utf8', function(error, data){
          request.write(returnHeader(data.toString().length, "text/html", "404 NOT FOUND"));
          request.write(data);
          request.end();
        });
      }

      else if(path.indexOf(".css") !== -1){
        request.write(returnHeader(data.toString().length, "text/css", "200 OK"));
        request.write(data);
        request.end();
      }

      else {
        request.write(returnHeader(data.toString().length, "text/html", "200 OK"));
        request.write(data);
        request.end();
      }


    });





  });

  request.on('end', function(){
    console.log('connection terminated');
  });
});

server.listen({port : 8080}, function(){
  var address = server.address();
  console.log('Opened server on %j', address.port);
});