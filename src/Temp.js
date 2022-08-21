import React, { useEffect } from 'react'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");

const send_message = ()=>{
    socket.emit("test_method", {
        name:"karthik",
        phone:"8888888888",
        password:"vk"
    })
}


const Temp = () => {
    useEffect(() => {
        socket.on("receive_message", (data)=>{
          alert(data.name);
        })
      
      }, [socket]); 


  return (
    <div>
        <h1>hello this is a test of socket io</h1>
        <input type = "text"></input>
        <button onClick={send_message}>test!</button>
    </div>
  )
}

export default Temp