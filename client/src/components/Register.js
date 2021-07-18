import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function RegisterUser() {
  const danger = document.querySelector(".invalid");
  const success = document.querySelector(".valid");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const connect = await fetch(
      process.env.CLIENT_SERVER,
      {
        method: "POST",
        body: JSON.stringify({ fullname, email, password }),
        headers: { "Content-type": "application/json" },
      }
    );
    status(connect);
  };

  const status = (res) => {
    if (res.status === 200) {
      danger.classList.add("hidden");
      success.classList.remove("hidden");
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } else {
      danger.classList.remove("hidden");
      success.classList.add("hidden");
    }
  };

  return (
    <div className="card card__">
      <p className="title">Sign-up</p>
      <div className="welcome-img">
        <img
          src="/imgs/welcome.jpg"
          className="card-img-top real-img"
          alt="login-img"
        />
      </div>
      <div className="card-body">
        <p className="hidden invalid">
          <small className="text-danger">
            User already registered. You may try logging in.
          </small>
        </p>
        <p className="hidden valid">
          <small className="text-success">Successfully registered.</small>
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputFullName">Full Name</label>
            <input
              type="text"
              className="form-control my-2"
              id="inputFullName"
              aria-describedby="fullName"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
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
            Register
          </button>
        </form>
        <div className="links">
          <Link to={"/"} className="link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
