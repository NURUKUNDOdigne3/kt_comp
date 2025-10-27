import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

// Store socket connections by payment ID
const paymentSockets = new Map<string, string>();

let io: SocketIOServer;

export function initSocket(server: HTTPServer) {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("registerPayment", (paymentId: string) => {
      console.log(`Registering socket ${socket.id} for payment ${paymentId}`);
      paymentSockets.set(paymentId, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      // Clean up payment registrations
      for (const [paymentId, socketId] of paymentSockets.entries()) {
        if (socketId === socket.id) {
          paymentSockets.delete(paymentId);
          break;
        }
      }
    });
  });

  return io;
}

// Export function to emit payment updates
export function emitPaymentUpdate(paymentId: string, status: "SUCCESSFUL" | "FAILED") {
  if (!io) {
    console.error("Socket.IO not initialized");
    return;
  }

  const socketId = paymentSockets.get(paymentId);
  if (socketId) {
    io.to(socketId).emit("payment:update", { status });
    console.log(`Sent WebSocket update for payment ${paymentId} to socket ${socketId}`);
    paymentSockets.delete(paymentId); // Clean up after sending
  }
}