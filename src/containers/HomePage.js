import React, { useEffect, useState } from "react";

import FriendList from "./FriendList";
import ChatPage from "./friendlistcomponents/ChatPage";
import Friendcard from "./friendlistcomponents/Friendcard";
import RequestList from "./friendlistcomponents/RequestList";
import About from "./homeComponents/About";
import AddFriend from "./homeComponents/AddFriend";
import Navbar from "./homeComponents/Navbar";

const axios = require("axios");

const HomePage = ({ userid, userLoggedOut }) => {
  const [showAddfriend, setShowAddfriend] = useState(false);

  const updateShowAddFriend = () => {
    setShowAddfriend(!showAddfriend);
    get_friend_list();
    if (showAddfriend == true) {
      setChatwith("welcome");
    }
  };

  const [list_of_friends, setList_of_friends] = useState([]);
  const [chatwith, setChatwith] = useState("welcome");
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  const get_friend_list = async () => {
    console.log("in get friend list ---------", userid);
    await axios.post(url + "getfriendlist", { userid: userid }).then((res) => {
      if (res.data) {
        console.log("friend list ------", res.data);
        setList_of_friends(res.data);
      }
    });
  };
  const changeChatwith = (username) => {
    console.log("change chat with triggered" + username);
    setChatwith(username);
  };
  useEffect(() => {
    get_friend_list();
  }, []);

  return (
    <div>
      <div className="container-fluid min-vh-100 d-flex flex-column nav-main">
        <Navbar
          updateShowAddFriend={updateShowAddFriend}
          userLoggedOut={userLoggedOut}
          changeChatwith={changeChatwith}
        />

        <div className="row flex-grow-1 mybg">
          <div
            className="col-md-4 friend-list overflow-auto py-3 px-0 preventscroll bg-glass pt-0"
            style={{ maxHeight: "92vh" }}
          >
            <About userid={userid} />
            {/* <RequestList /> */}
            {showAddfriend && (
              <AddFriend
                userid={userid}
                updateShowAddFriend={updateShowAddFriend}
              />
            )}
            {/* <h1 className="display-6">{userid}</h1> */}

            {/* <h1 className="display-6">Friends</h1> */}
            <p className="fs-6 fw-normal ps-2">Friends</p>
            {list_of_friends.map((val, index) => {
              return (
                <div
                  onClick={() => {
                    console.log("ola");
                    changeChatwith(val);
                  }}
                >
                  <Friendcard username={val} key={index} />
                </div>
              );
            })}
            {/* add friend page here */}
          </div>
          <div
            className="col-md-8 px-2 chat-main d-flex align-items-center"
            style={{ maxHeight: "92vh" }}
          >
            <ChatPage username={chatwith} userid={userid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
