import React, { useState } from "react";

const axios = require("axios");

const LoginForm = ({ changePage, userLoggedIn }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  // function to handle login request form backend
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  async function handleLogin() {
    console.log("request for login");
    try {
      const temp = await axios
        .post(url + "auth", { userid: userid, password: password })
        .then((res) => {
          if (res.data) {
            // the user exists.
            console.log(res);
            userLoggedIn(res.data.username);
          } else {
            // user doesnot exists
            console.log("user does not exist try again");
          }
        });
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  }

  // function to save the user id in client browser

  return (
    <div>
      <div className="h-25 "></div>
      <div className="bg-glass p-5">
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
            User Name
          </label>
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
            onClick={() => handleLogin()}
          >
            Login
          </button>
          {/* <button className="col-3 btn btn-dark shadow-sm btn-sm">
                  Register
                </button> */}
        </div>
        <a
          className="row pt-2 btn btn-sm"
          style={{ cursor: "pointer" }}
          onClick={() => changePage(false)}
        >
          Register here
        </a>
      </div>
    </div>
    // <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
    //   <div
    //     id="radius-shape-1"
    //     className="position-absolute rounded-circle shadow-5-strong"
    //   />
    //   <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
    //   <div className="card bg-glass">
    //     <div className="card-body px-4 py-5 px-md-5">
    //       <form>
    //         <div className="form-outline mb-4">
    //           <input
    //             type="text"
    //             id="userid"
    //             className="form-control"
    //             onChange={(event) => {
    //               setUserid(event.target.value);
    //             }}
    //           />
    //           <label className="form-label" htmlFor="userid">
    //             User Id
    //           </label>
    //         </div>
    //         {userid}
    //         {/* Password input */}
    //         <div className="form-outline mb-4">
    //           <input
    //             type="password"
    //             id="form3Example4"
    //             className="form-control"
    //             onChange={(event) => {
    //               setPassword(event.target.value);
    //             }}
    //           />
    //           <label className="form-label" htmlFor="form3Example4">
    //             Password
    //           </label>
    //         </div>
    //         {password}
    //         {/* Submit button */}
    //         <button
    //           type="button"
    //           className="btn btn-primary btn-block mb-4"
    //           onClick={() => {
    //             handleLogin();
    //           }}
    //         >
    //           Login
    //         </button>
    //         {/* Register buttons */}
    //         <div className="text-center">
    //           <span>register here:</span>
    //           <button
    //             type="button"
    //             className="btn btn-link btn-floating mx-1"
    //             onClick={() => changePage(false)}
    //           >
    //             Register
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginForm;
