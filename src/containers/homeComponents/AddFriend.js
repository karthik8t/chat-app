import React, { useState } from "react";
import RequestList from "../friendlistcomponents/RequestList";
const axios = require("axios");
const AddFriend = ({ userid, updateShowAddFriend }) => {
  const [friendusername, setFriendusername] = useState("");
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  const addFriend = async (username) => {
    console.log("trying to add a friend");
    console.log(friendusername + " ola " + userid);
    try {
      const temp = await axios
        .post(url + "addfriend", { username: username, userid: userid })
        .then((res) => {
          if (res.data) {
            // the user exists.
            console.log("friend added");
            console.log(res);
          } else {
            // user doesnot exists
            console.log("failed to add friend");
          }
        });
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      updateShowAddFriend();
    }, 200);
  };
  return (
    <div>
      <RequestList addFriend={addFriend} userid={userid} />
      <div className="add-card d-flex flex-column py-3 px-3 mb-3 mt-0  ms-0 me-0">
        <div className="row d-flex">
          <h4 className="pb-3">Add friend</h4>
          <div className="input-group mb-3 pb-1">
            <span
              className="input-group-text mybtn"
              id="inputGroup-sizing-default"
            >
              User name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setFriendusername(event.target.value)}
            />
          </div>
          <button
            className="mybtn btn w-25 ms-3 rounded"
            onClick={() => {
              addFriend(friendusername);
            }}
          >
            Add friend
          </button>
          <button
            className="mybtn btn w-25 ms-auto me-3 rounded"
            onClick={updateShowAddFriend}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     AddFriend{userid}
  //     <label htmlFor="inputPassword5" className="form-label">
  //       Password
  //     </label>
  //     <input
  //       type="text"
  //       className="form-control"
  //       onChange={(event) => setFriendusername(event.target.value)}
  //     />
  //     <div className="form-text">enter friend userid</div>
  //     <button onClick={addFriend}>add friend</button>
  //     <button onClick={updateShowAddFriend}>go home</button>
  //   </div>
  // );
};

export default AddFriend;
