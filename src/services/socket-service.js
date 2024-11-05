import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io("http://localhost:3000");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // func for send event
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // func for listen event
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // func for turn-off event
  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

const socketService = new SocketService();
export default socketService;
