import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import "./styles/jett.css";
import "./styles/chamber.css";
import "./styles/sage.css";
import "./styles/viper.css";

import "./styles/phoenix.css";
import "./styles/reyna.css";

import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import { SocketContext } from "./socket";
const axios = require("axios");

function App() {
  const socket = useContext(SocketContext);
  const [showHome, setShowHome] = useState(false);
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const getAgent = async (id) => {
    await axios
      .post("https://afternoon-dawn-75866.herokuapp.com/getAvatar", {
        username: id,
      })
      .then((res) => {
        console.log("getting avatar +++++++++++", res);
        let main = document.getElementById("main");
        const classes = [...main.classList];
        console.log(classes);
        classes.map((val) => {
          main.classList.remove(val);
        });
        main.classList.add(res.data.agent);
      });
  };
  const userLoggedIn = (id) => {
    socket.emit("loggedin", id);
    getAgent(id);
    console.log("userLoggedIn has been invoked " + id);
    setUserid(id);
    if (localStorage.getItem("userid") == null) {
      console.log("user doesnot exist so adding him to local storage");
      storeUserid(id);
    }
    setShowHome(true);
  };

  const userLoggedOut = () => {
    removeUserid(userid);
    setUserid(0);
    setShowHome(false);
  };

  const storeUserid = (userdata) => {
    console.log("setting local storage for userid");
    console.log(userdata);
    localStorage.setItem("userid", userdata);
    const uid = localStorage.getItem("userid");
    console.log(typeof uid);
  };
  const removeUserid = () => {
    console.log("romoving userid from local storage");
    localStorage.removeItem("userid");
  };

  useEffect(() => {
    let uid = localStorage.getItem("userid");
    console.log("ola " + uid);
    if (uid != null) {
      userLoggedIn(uid);
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {!showHome && <LoginPage userLoggedIn={userLoggedIn} />}
      {showHome && <HomePage userid={userid} userLoggedOut={userLoggedOut} />}
      {/* <Temp /> */}
    </div>
  );
}

export default App;
