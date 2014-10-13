var net = require('net');
var client_ctr = 0;

var server = net.createServer(function (socket) {

	socket.on('data', function(data){
		console.log("Client command: " + data);

		if (String(data).trim() == "disconnect") {
            console.log("Disconnect command received");
            socket.write("Disconnecting. Have a nice day.\n");
            socket.close();
        }
        else if (String(data).trim() == "server address") {
            console.log("Server address request received");
            address = server.address();
            socket.write("address: " + address.address + " port: " + address.port + "\n");
        }
        else if (String(data).match(/add\(/i)) {
            var vals = String(data).split(/,|\(|\)/);
            var val1 = parseInt(vals[1]);
            var val2 = parseInt(vals[2]);
            if(testInts(val1,val2))
                socket.write('Result: ' + (val1+val2) + '\n');
            else sendIntError(socket);
        }
        else if (String(data).match(/subtract\(/i)) {
            var vals = String(data).split(/,|\(|\)/);
            var val1 = parseInt(vals[1]);
            var val2 = parseInt(vals[2]);
            if(testInts(val1,val2))
                socket.write('Result: ' + (val1-val2) + '\n');
            else sendIntError(socket);
        }
        else if (String(data).match(/multiply\(/i)) {
            var vals = String(data).split(/,|\(|\)/);
            var val1 = parseInt(vals[1]);
            var val2 = parseInt(vals[2]);
            if(testInts(val1,val2))
                socket.write('Result: ' + (val1*val2) + '\n');
            else sendIntError(socket);
        }
        else if (String(data).match(/divide\(/i)) {
            var vals = String(data).split(/,|\(|\)/);
            var val1 = parseInt(vals[1]);
            var val2 = parseInt(vals[2]);
            if(testInts(val1,val2))
                socket.write('Result: ' + (val1/val2) + '\n');
            else sendIntError(socket);
        }
        else socket.write("Unknown command: " + data)
	});

    function sendIntError(socket) {
        socket.write('Error: Values must be integers\n')
    }

    function testInts(val1, val2) {
        if(!isInt(val1) || !isInt(val2)) return false;
        return true;
    }

    // test whether a value is an integer
    function isInt(val){
      // parse value for int and float will be the same if the value is actually an int
      if((parseFloat(val) == parseInt(val)) && !isNaN(val)){
        return true;
      } else { 
        return false;
      } 
    }

    client_ctr++;
    console.log("Client " + client_ctr + " connected");
    socket.write("Connected to server.\r\n");

});

server.listen(####, "123.4.5.6");
