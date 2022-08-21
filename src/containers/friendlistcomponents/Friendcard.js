import React, { useEffect, useState } from "react";
const axios = require("axios");
const Friendcard = ({ username }) => {
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
      </div>
    </div>

    // <section className={agent + "-card f-card"} style={{ maxWidth: "30rem" }}>
    //   <div className="card testimonial-card mt-2 mb-3 bg-glass d-flex flex-row py-2">
    //     <div className="card-up aqua-gradient" />
    //     <div className="ms-4 avatar my-auto white">
    //       {/* <img
    //         src={"/public/" + agent + ".jpg"}
    //         className="rounded-circle img-fluid"
    //         alt="woman avatar"
    //       /> */}
    //       <div className="agent-avatar"></div>
    //     </div>
    //     <div className="card-body">
    //       <h4 className="font-weight-bold ">{username}</h4>
    //       {/* <p>
    //         <i className="fas fa-quote-left" /> you can't kill my allies
    //       </p> */}
    //     </div>
    //   </div>
    // </section>
  );
};

export default Friendcard;
