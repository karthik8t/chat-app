import React from "react";
import socketio from "socket.io-client";
const socketurl = "https://afternoon-dawn-75866.herokuapp.com/";

export const socket = socketio.connect(socketurl);
export const SocketContext = React.createContext();
