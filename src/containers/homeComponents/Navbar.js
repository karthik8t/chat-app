import React from "react";

const Navbar = ({ updateShowAddFriend, userLoggedOut, changeChatwith }) => {
  return (
    <nav className="navbar navbar-expand-lg nav-main overflow-hidden">
      <div className="container-fluid">
        <h4
          onClick={() => changeChatwith("welcome")}
          style={{ cursor: "pointer" }}
        >
          Valo-Chat
        </h4>
        <div className="d-flex flex-row" id="navbarText">
          {/* <span onClick={() => changeChatwith("welcome")} className="ms-auto">
            Home
          </span> */}
          <span
            className="me-4 ms-auto add-friend-icon"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              updateShowAddFriend();
              changeChatwith("welcome");
            }}
          ></span>
          <span
            className="logout-icon"
            style={{ cursor: "pointer" }}
            onClick={() => userLoggedOut()}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
