import React from "react";
import LoginMain from "./components/LoginMain";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = ({ changePage, anotherMethod }) => {
  return (
    <div className="h-100">
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <LoginMain />
            <RegisterForm changePage={changePage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
