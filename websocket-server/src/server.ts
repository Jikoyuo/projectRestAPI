import WebSocket, { Server } from "ws";

const server: Server = new WebSocket.Server({ port: 8081 });

server.on("connection", (socket: WebSocket) => {
  console.log("New client connected");

  socket.on("message", (message: string) => {
    console.log("Received:", message);

    // Kirim pesan ke semua klien lain
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8081");
