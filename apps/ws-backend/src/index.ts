import {WebSocketServer} from "ws"


const wss = new WebSocketServer({ port: 8080});

wss.on("connection", (socket) => {
    console.log("New Connection Established");
    socket.send(JSON.stringify( {message: "Welcome to the server" }));
})