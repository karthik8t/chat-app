import React, { useEffect, useState } from "react";
const axios = require("axios");
const RequestCard = ({ username, addFriend }) => {
  const [agent, setAgent] = useState("Jett");
  useEffect(() => {
    console.log("attaining  card _______()*$(*$*#$(* ", username);
    const getAgent = async () => {
      await axios
        .post("https://afternoon-dawn-75866.herokuapp.com/getAvatar", {
          username: username,
        })
        .then((res) => {
          console.log("getting avatar ---", res);
          setAgent(res.data.agent);
        });
    };
    getAgent();
  });

  return (
    <div
      className={
        agent + "-card f-card bg-glass px-3 py-2 border-bottom border-dark"
      }
      style={{ cursor: "pointer" }}
    >
      <div className="testimonial-card d-flex flex-row justify-content-start align-items-center">
        <div className="avatar"></div>
        <p className="lh-base ps-4 mb-0 fs-4 fw-light">{username}</p>
        <button className="ms-auto mybtn" onClick={() => addFriend(username)}>
          add
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
