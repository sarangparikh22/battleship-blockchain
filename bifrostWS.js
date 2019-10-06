const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7000 });

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log("message received", msg.toString());
    wss.clients.forEach(function each(client) {
        if(client.readyState === WebSocket.OPEN) {
            client.send(msg.toString());
        }
    });
});

server.on('listening', () => {
    console.log("Listening to Bifrost");
    const address = server.address();
    server.send('hello', 9000, '127.0.0.1');
});

server.bind(7100);

wss.on('connection', function connection(ws) {
    console.log("A client is connected")
    ws.on('message', function incoming(message) {
        console.log("Message received");
        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        server.send(message, 9000, '127.0.0.1');
    });
});