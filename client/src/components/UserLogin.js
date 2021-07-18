import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function UserLogin() {
  const danger = document.querySelector(".invalid");
  const userInfo = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const connect = await fetch(
      process.env.CLIENT_SERVER,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      }
    );
    if (connect.status === 200) history.push("/dashboard");
    const res = await connect.json();
    userInfo.setUserName(res.name);
    userInfo.setUserEmail(res.email);
    status(connect);
  };

  const status = (res) => {
    if (res.status === 200) danger.classList.add("hidden");
    else danger.classList.remove("hidden");
  };

  return (
    <div className="card card__">
      <p className="title">Sign-in</p>
      <div className="login-img">
        <img
        
          src="\imgs\hello.jpg"
          className="card-img-top real-img"
          alt="login-img"
        />
      </div>
      <div className="card-body">
        <p className="hidden invalid">
          <small className="text-danger">Invalid username or password</small>
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail">Username / Email</label>
            <input
              type="email"
              className="form-control my-2"
              id="inputEmail"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control my-2"
              id="inputPassword"
              aria-describedby="passHelp"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success my-2">
            Login
          </button>
        </form>
        <div className="links">
          <Link to={"/forgot-password"} className="link">
            Forgot Password
          </Link>
          <Link to={"/register"} className="link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
