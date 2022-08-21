const NavbarChat = ({ username, status }) => {
  return (
    <nav className="navbar navbar-expand-lg nav-sub overflow-hidden sticky-top border-top  border-dark">
      <div className="container-fluid">
        <a className="navbar-brand ms-3" href="#">
          {username}
        </a>
        <div id="navbarText">
          <span className="navbar-text " style={{ cursor: "pointer" }}>
            {status}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarChat;
