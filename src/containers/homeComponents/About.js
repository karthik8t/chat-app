import React, { useEffect, useState } from "react";
import axios from "axios";
const About = ({ userid }) => {
  const [changeToggle, setChangeToggle] = useState(false);
  const [avatar, setAvatar] = useState("Jett");
  const [agents, setAgents] = useState([
    "Jett",
    "Chamber",
    "Reyna",
    "Sage",
    "Phoenix",
    "Viper",
  ]);
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  const getAvatar = async () => {
    await axios.post(url + "getAvatar", { username: userid }).then((res) => {
      console.log("getting avatar 39884972389472837", res.data);
      setAvatar(res.data.agent);
    });
  };
  const changeAgent = async (val) => {
    await axios
      .post(url + "changeAgent", { userid: userid, newAgent: val })
      .then((res) => console.log(res.data));

    let main = document.getElementById("main");
    const classes = [...main.classList];
    classes.map((val) => {
      main.classList.remove(val);
    });
    main.classList.add(val);
    getAvatar();
  };
  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div className="">
      <section className="mx-auto mt-0 bg-glass">
        <div className=" testimonial-card mt-0 mb-3">
          <div
            className={"f-card bg-glass px-3 py-2 border-bottom border-dark"}
            style={{ cursor: "pointer" }}
          >
            <div className="testimonial-card d-flex flex-row justify-content-start align-items-center">
              <div
                className={avatar + "-mini"}
                style={{ width: "50px", height: "60px" }}
              ></div>
              <p className="lh-base ps-4 mb-0 fs-4 fw-light">{userid}</p>
              <button
                className="mybtn btn ms-auto"
                onClick={() => setChangeToggle(!changeToggle)}
              >
                Change Theme
              </button>
            </div>
          </div>
        </div>
      </section>
      {changeToggle && (
        <div className="row d-flex p-4">
          {agents.map((val, index) => {
            console.log("register image agent mini ------", val);
            return (
              <span
                key={index}
                onClick={() => changeAgent(val)}
                className={"col-4 " + val + "-mini"}
                style={{ cursor: "pointer" }}
              ></span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default About;
