function startConnection() {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://127.0.0.1:7000');

    // Connection opened
    socket.addEventListener('open', function (event) {
        // socket.send('Hello Server!');
        console.log("connection established :)")
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        const msgNode = document.createElement("p");
        const msgText = document.createTextNode(`User: ${event.data}`);
        msgNode.appendChild(msgText);
        document.getElementById("chatWindow").appendChild(msgNode);
    });
    return socket;
}

const socket = startConnection();

function sendMsg() {
    const msg = document.getElementById("chatBox").value;
    socket.send(msg);
    const msgNode = document.createElement("p");
    const msgText = document.createTextNode(`Me: ${msg}`);
    msgNode.appendChild(msgText);
    document.getElementById("chatWindow").appendChild(msgNode);
}