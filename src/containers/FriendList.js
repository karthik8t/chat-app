import React, { useEffect, useState } from "react";
import ChatPage from "./friendlistcomponents/ChatPage";
import Friendcard from "./friendlistcomponents/Friendcard";
const axios = require("axios");

const FriendList = ({ userid }) => {
  const [list_of_friends, setList_of_friends] = useState([]);
  const [chatwith, setChatwith] = useState("welcome");
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  const get_friend_list = async () => {
    console.log("in get friend list ---------", userid);
    await axios.post(url + "getfriendlist", { userid: userid }).then((res) => {
      console.log("friend list me");
      console.log(res.data);
      console.log(res.data.friendlist);
      if (res.data) {
        setList_of_friends(res.data.friendlist);
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
    <div className="h-100">
      <div className="row h-100">
        <div className="col-md-3 mr-auto bg-primary ps-5">
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
        </div>

        <div className="col-md-9">
          this is the content{userid}
          <ChatPage username={chatwith} userid={userid} />
        </div>
      </div>
    </div>
  );
};

export default FriendList;
