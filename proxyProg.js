const args = process.argv.slice(2);

const net = require('net');

const LOCAL_PORT = 8000;
const LOCAL_IP = '127.0.0.1';

let REMOTE_IP= args[0] || "sepie.es"
let REMOTE_PORT = args[1] || 80

const PROG_PORT = 8001;

const server = net.createServer(function (socket) {
    const serviceSocket = new net.Socket();
    serviceSocket.connect(parseInt(REMOTE_PORT), REMOTE_IP, function () {
        socket.on('data', function (msg) {
            console.log (msg + "")
            serviceSocket.write(msg);
        });
        serviceSocket.on('data', function (data) {
            socket.write(data);
        });
    });
}).listen(LOCAL_PORT, LOCAL_IP);

console.log("TCP server accepting connection on port: " + LOCAL_PORT);


const serverProg = net.createServer(function (socket) {
    socket.on('data', function(msg) {
        const newValues = JSON.parse(msg);
        REMOTE_IP = newValues.remote_ip;
        REMOTE_PORT = parseInt(newValues.remote_port);
    });
}).listen(PROG_PORT, LOCAL_IP);

console.log("Conectado con programador: " + PROG_PORT)