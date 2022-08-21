import React, { useState } from "react";
const axios = require("axios");

const RegisterForm = ({ changePage, userLoggedIn }) => {
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currAgent, setCurrAgent] = useState("Jett");
  const [agents, setAgents] = useState([
    "Jett",
    "Chamber",
    "Reyna",
    "Sage",
    "Phoenix",
    "Viper",
  ]);

  // const miniAgent = (agent) => {
  //   let myurl = "url('/public/miniAgent/" + agent + "-mini.jpg')";
  //   console.log(myurl);
  //   return {
  //     width: "100px",
  //     height: "100px",
  //     backgroundImage: myurl,
  //     backgroundSize: "contain",
  //   };
  // };

  var bodyelement = document.getElementById("main");

  const changeAgent = (val) => {
    console.log("Agent changed", val);
    setCurrAgent(val);
    bodyelement.classList.forEach((currclass) => {
      bodyelement.classList.remove(currclass);
    });
    bodyelement.classList.add(val);
  };
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  async function handlaRegister() {
    console.log("request for register");
    console.log(name + userid + password + currAgent);
    try {
      const temp = await axios
        .post(url + "registeruser", {
          name: name,
          username: userid,
          password: password,
          agent: currAgent,
        })
        .then((res) => {
          if (res.data) {
            // user successfully registered
            console.log("register successfull");
            userLoggedIn(res.data.username);
          } else {
            // the user exists. thus register failed
            setMessage("userid already exists");
          }
        });
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <div className="h-25 "></div> */}
      <div className="bg-glass p-5">
        <div className="row d-flex mb-5">
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
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control shadow"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">User Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control shadow"
              placeholder="username@8t"
              onChange={(event) => setUserid(event.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control shadow"
              id="inputPassword"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-around pt-4">
          <button
            className="col-3 btn btn-success shadow-sm btn-sm"
            onClick={() => handlaRegister()}
          >
            Register
          </button>
          {/* <button className="col-3 btn btn-dark shadow-sm btn-sm">
                Register
              </button> */}
        </div>
        <a
          className="row pt-2 btn btn-sm"
          style={{ cursor: "pointer" }}
          onClick={() => changePage(true)}
        >
          Login here
        </a>
      </div>
    </div>
  );
  // return (
  //   <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
  //     <div
  //       id="radius-shape-1"
  //       className="position-absolute rounded-circle shadow-5-strong"
  //     />
  //     <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
  //     <div className="card bg-glass">
  //       <div className="card-body px-4 py-5 px-md-5">
  //         <form>
  //           {/* user id input */}
  //           <div className="form-outline mb-4">
  //             <input
  //               type="text"
  //               id="email"
  //               className="form-control"
  //               onChange={(event) => setUserid(event.target.value)}
  //             />
  //             <label className="form-label" htmlFor="email">
  //               User Id
  //             </label>
  //           </div>
  //           <div className="form-outline">
  //             <input
  //               type="text"
  //               id="form3Example1"
  //               className="form-control"
  //               onChange={(event) => setName(event.target.value)}
  //             />
  //             <label className="form-label" htmlFor="form3Example1">
  //               name
  //             </label>
  //           </div>

  //           {/* Password input */}
  //           <div className="form-outline mb-4">
  //             <input
  //               type="password"
  //               id="form3Example4"
  //               className="form-control"
  //               onChange={(event) => setPassword(event.target.value)}
  //             />
  //             <label className="form-label" htmlFor="form3Example4">
  //               Password
  //             </label>
  //           </div>
  //           {/* Submit button */}
  //           <button
  //             type="button"
  //             className="btn btn-primary btn-block mb-4"
  //             onClick={handlaRegister}
  //           >
  //             Register
  //           </button>
  //           {/* Register buttons */}
  //           <div className="text-center">
  //             <span>login here:</span>
  //             <button
  //               type="button"
  //               className="btn btn-link btn-floating mx-1"
  //               onClick={() => changePage(true)}
  //             >
  //               Login
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default RegisterForm;
