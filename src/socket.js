import React from "react";
import socketio from "socket.io-client";
const socketurl = "http://localhost:3001/";

export const socket = socketio.connect(socketurl);
export const SocketContext = React.createContext();
