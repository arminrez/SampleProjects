var http = require('http'),
url = require('url'),
fs = require('fs');

var server = http.createServer(function (req, res) {

	var path = url.parse(req.url).pathname; 
	
    switch (path){
	case '/':
		fs.readFile(__dirname + '/chatclient.html', function(err, data){
		if (err) return send404(res);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data, 'utf8');
		res.end();
	});
	break;
							   
	default: send404(res);
	}
}),

send404 = function(res){	
	res.writeHead(404);	
	res.write('404');	
	res.end();	
};

server.listen(####, "123.4.5.6");
console.log('Server running at http://123.4.5.6:####/');

var io = require('socket.io').listen(server);

// on a 'connection' event
io.sockets.on('connection', function(socket){

    console.log("Connection " + socket.id + " accepted.");
    
	// now that we have our connected 'socket' object, we can 
    // define its event handlers

    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });

	// when we receive a message, send it to all connected clients
    socket.on('message', function(message){
		console.log("Received message: " + message + " - from client " + socket.id);
		// relay that message to all connected clients
		io.sockets.emit('chat', socket.id, message);
	});

});

