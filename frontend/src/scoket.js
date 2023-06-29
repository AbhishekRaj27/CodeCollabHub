import { io } from "socket.io-client";

const options = {
  reconnect_attempt: "Infinity",
  // timeout: 10000,
  autoConnect: false,
  transports: ["websocket"],
};

export const socket = io(process.env.REACT_APP_BACKEND_URL, options);
