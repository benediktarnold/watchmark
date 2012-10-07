#! /usr/bin/env node
var userargs = process.argv.slice(2);
console.log(userargs);
//var firstFile = userargs[0];
var fs = require("fs"),
app = require("http").createServer(handler),
io = require('socket.io').listen(app),
md = require("node-markdown").Markdown;




app.listen(3000);


userargs.forEach(function(file){
	io.of("/"+file).on('connection', function (socket) {
		emitToSocket(file, socket);
	  	fs.watch(file, function(e,filename){
			var name = filename?filename:file;
			console.log("Something happens on ",e,name);
			emitToSocket(name, socket);
		})

});
})





function emitToSocket(name, socket){
	fs.readFile(name, function(err,data){
		var markup = md(data.toString());
		console.log("emitting to","/"+name)
		//socket.broadcast.to("/"+name).emit('change', { markup: markup });
		socket.emit('change', { markup: markup });
	});
}

function handler (req, res) {
	console.log(req.url);
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



