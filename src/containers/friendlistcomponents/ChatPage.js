import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../../socket";
import ChatComponent from "../components/ChatComponent";
import NavbarChat from "../homeComponents/NavbarChat";
import WelcomePage from "../homeComponents/WelcomePage";

// import socketClient from "socket.io-client";

const ChatPage = ({ username, userid }) => {
  const socket = useContext(SocketContext);
  const [inputmessage, setInputmessage] = useState();
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  // const socket = socketClient(url);
  const [status, setStatus] = useState("offline");
  const [chats, setChats] = useState([]);
  const [messagerecieced, setMessagerecieced] = useState("");

  let mynav = (
    <nav
      className="nav-sub sticky-top px-4 d-flex justify-content-between align-items-center"
      style={{ minHeight: "10%" }}
    >
      <h4>{username}</h4>
      <span className="fw-semibold" style={{ cursor: "pointer" }}>
        {status}
      </span>
    </nav>
  );
  const getcurrusername = () => {
    return username;
  };
  const sendmessage = () => {
    if (inputmessage == "") {
      return;
    }
    socket.emit("messagesend", {
      message: inputmessage,
      from: userid,
      to: username,
    });
    setChats((prev) => [
      ...prev,
      { from: "me", message: inputmessage, time: new Date() },
    ]);
    sendmessagetodb();
    setInputmessage("");
    document.getElementById("minput").value = "";
    scrolltobottom();
  };

  const scrolltobottom = () => {
    const ele = document.getElementById("gobottom");
    ele.click();
  };

  const sendmessagetodb = async () => {
    await axios
      .post(url + "sendmessage", {
        message: inputmessage,
        sender: userid,
        reciever: username,
      })
      .then((res) => {
        console.log("sent message", res);
      });
  };
  async function getStatus() {
    console.log("getting status");
    await axios
      .post(url + "getstatus", { username: username })
      .then((res) => {
        console.log("user status is ---", res.data.status);
        setStatus(res.data.status);
      })
      .catch((err) => console.log("getMessages-err", err));
  }

  useEffect(() => {
    console.log("current user is ========", username);
    async function getInitalMsg() {
      console.log("in useEffct initialMesage");
      await axios
        .post(url + "getmessages", { sender: userid, reciever: username })
        .then((res) => {
          console.log("res ---", res);
          const temp = res.data.map((item) => {
            if (item.sender == userid) {
              return {
                from: "me",
                message: item.message,
                time: item.createdAt,
              };
            } else {
              return {
                from: "them",
                message: item.message,
                time: item.createdAt,
              };
            }
          });
          setChats(temp);
        })
        .catch((err) => console.log("getMessages-err", err));
    }

    getInitalMsg();
    getStatus();
    // scrolltobottom();
    setTimeout(() => {
      scrolltobottom();
    }, 200);
  }, [username]);

  useEffect(() => {
    const tempuser = username;
    console.log("testing socket io recieve message---------------");
    socket.on("recieveMessage", (res) => {
      console.log("in recieve message", res);
      setChats((prev) => [
        ...prev,
        { from: "them", message: res.message, time: res.time },
      ]);
      setTimeout(() => {
        scrolltobottom();
      }, 200);
    });
    socket.on("onlineStatus", (res) => {
      console.log("user online state update ------", res, getcurrusername());
      // if (getcurrusername() == res.username) {
      //   setStatus(res.status);
      // }
      setTimeout(() => {
        getStatus();
      }, 2000);
    });
    scrolltobottom();
  }, [username]);

  // useEffect(() => {
  //   console.log("gotmessage -------------------------------------------");
  //   socket.on("gotmessage", (data) => {
  //     console.log(data.from, data.message);
  //     setMessagerecieced(data.message);
  //   });
  // }, [messagerecieced]);

  return (
    <div
      className="rounded overflow-auto  preventscroll bg-glass d-flex flex-column w-100 m-3"
      style={{ maxHeight: "90vh", height: "95%" }}
    >
      {username != "welcome" && mynav}
      {username == "welcome" && <WelcomePage />}
      <a class="nav-link" href="#bottom" id="gobottom"></a>
      {/* here we should implement ui for chat */}
      <div className="container d-flex flex-column pt-2 px-4">
        {username != "welcome" &&
          chats.map((val) => {
            return (
              <ChatComponent
                message={val.message}
                from={val.from}
                time={val.time}
              />
            );
          })}
      </div>
      <span id="bottom"></span>
      {/* fixed-bottom position */}
      {username != "welcome" && (
        <div className="mt-auto sticky-bottom bg-glass">
          <div
            className="input-group m-1 form-control"
            style={{ width: "99%" }}
          >
            <input
              id="minput"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setInputmessage(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  sendmessage();
                }
              }}
            />
            <button
              type="button"
              className="input-group-text mybtn"
              id="inputGroup-sizing-default"
              onClick={sendmessage}
              style={{ cursor: "pointer" }}
            >
              send message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
