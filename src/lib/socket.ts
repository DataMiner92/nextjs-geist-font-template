import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });
    
    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error: ", err);
    });
    
    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
