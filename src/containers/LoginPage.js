import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginPage = ({ userLoggedIn }) => {
  const [loginPage, setLoginPage] = useState(true);
  const changePage = () => {
    setLoginPage(!loginPage);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center ">
      <div className="row flex-grow-1">
        <div className="col-md-5  bg-dark d-flex justify-content-center align-items-center flex-column">
          <div
            className="agent-register"
            style={{ height: "400px", width: "400px" }}
          ></div>
        </div>
        <div className="col-md-7  d-flex align-items-center justify-content-center login-chat">
          <div className="p-5 shadow h-75  d-flex align-items-center justify-content-center ">
            {loginPage && (
              <LoginForm changePage={changePage} userLoggedIn={userLoggedIn} />
            )}
            {!loginPage && (
              <RegisterForm
                changePage={changePage}
                userLoggedIn={userLoggedIn}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="h-100">
  //     <section className="background-radial-gradient h-100 ">
  //       <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex ">
  //         <div className="row gx-lg-5 align-items-center mb-5 align-items-center justify-content-center">
  //           <LoginMain />
  // {loginPage && (
  //   <LoginForm changePage={changePage} userLoggedIn={userLoggedIn} />
  // )}
  // {!loginPage && (
  //   <RegisterForm
  //     changePage={changePage}
  //     userLoggedIn={userLoggedIn}
  //   />
  // )}
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default LoginPage;
