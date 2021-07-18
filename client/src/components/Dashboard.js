import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Dashboard() {
  const history = useHistory();
  const { username, useremail } = useContext(UserContext);

  // Log in
  if (username !== "") {
    localStorage.setItem("username", username);
    localStorage.setItem("useremail", useremail);
  }
  const getName = localStorage.getItem("username");
  const getEmail = localStorage.getItem("useremail");

  // log out
  const logOut = () => {
    localStorage.setItem("username", "Guest User");
    localStorage.setItem("useremail", "");
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <span className="navbar-brand">Welcome, {getName}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active ">
              <span className="nav-link"> {getEmail}</span>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link text-white btn btn-danger"
                id="signout"
                onClick={logOut}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Dashboard;
