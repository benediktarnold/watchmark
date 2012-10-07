#! /usr/bin/env node
var userargs = process.argv.slice(2);
var firstFile = userargs[0];
var fs = require("fs"),
app = require("http").createServer(handler),
io = require('socket.io').listen(app),
md = require("node-markdown").Markdown;


function emitToSocket(name, socket){
	fs.readFile(name, function(err,data){
		var markup = md(data.toString());
		socket.emit('change', { markup: markup });
	});
}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

app.listen(3000);
console.log("Visit http://localhost:3000 for updates on "+firstFile);

io.sockets.on('connection', function (socket) {
	emitToSocket(firstFile, socket);
  	fs.watch(firstFile, function(e,filename){
		var name = filename?filename:firstFile;
		console.log("Something happens on ",e,name);
		emitToSocket(name, socket);
	})

});



