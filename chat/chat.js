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
        document.getElementById("chatWindow").appendChild(`<p>User2: ${event.data}</p>`);
    });

    return socket;
}

const socket = startConnection();

function sendMsg() {
    const msg = document.getElementById("chatBox").value;
    socket.send(msg);
}