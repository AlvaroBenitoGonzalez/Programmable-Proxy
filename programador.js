const args = process.argv.slice(2);

const net = require('net');

const PORT = 8001;
const PROXY_IP = args[0];
const NEW_IP = args[1]
const NEW_PORT = parseInt(args[2])

const proxySocket = new net.Socket();
proxySocket.connect(parseInt(PORT), PROXY_IP, function () {
    let newValues = JSON.stringify({
        'remote_ip': NEW_IP,
        'remote_port': NEW_PORT
    })
    proxySocket.end(newValues)
});