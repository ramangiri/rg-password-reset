import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function ResetPassword(props) {
  const danger = document.querySelector(".invalid");
  const success = document.querySelector(".valid");
  const unauthorized = document.querySelector(".unauthorized");
  const history = useHistory();
  const [newpass, setNewpass] = useState("");
  const [repeatpass, setRepeatpass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (matchPassword() !== undefined) {
      const connect = await fetch(
        `process.env.CLIENT_SERVER${props.location.pathname}`,
        {
          method: "POST",
          body: JSON.stringify({
            password: matchPassword(),
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      status(connect);
    }
  };

  const matchPassword = () => {
    if (newpass === repeatpass) {
      danger.classList.add("hidden");
      return repeatpass;
    } else danger.classList.remove("hidden");
  };

  const status = (res) => {
    if (res.status === 200) {
      success.classList.remove("hidden");
      unauthorized.classList.add("hidden");
      setTimeout(() => {
        history.push("/");
      }, 500);
    } else {
      unauthorized.classList.remove("hidden");
      success.classList.add("hidden");
    }
  };

  return (
    <div className="card card__">
      <p className="title">Update Password</p>
      <div className="reset-img">
        <img
          src="/imgs/key1.jpg"
          className="card-img-top real-img"
          alt="reset-password-img"
        />
      </div>
      <div className="card-body">
        <p className="hidden invalid">
          <small className="text-danger">
            Password do not match. Please try again.
          </small>
        </p>
        <p className="hidden valid">
          <small className="text-success">
            You have successfully registered your new password.
          </small>
        </p>
        <p className="hidden unauthorized">
          <small className="text-danger">
            Unauthorized Access. Verify your email again.
          </small>
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputPass1">New Password</label>
            <input
              type="password"
              className="form-control my-2"
              id="inputPass1"
              aria-describedby="passHelp"
              required
              onChange={(e) => setNewpass(e.target.value)}
            />
            <label htmlFor="inputPass2">Repeat Password</label>
            <input
              type="password"
              className="form-control my-2"
              id="inputPass2"
              aria-describedby="passHelp"
              required
              onChange={(e) => setRepeatpass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success my-2">
            Reset
          </button>
        </form>
        <div className="links">
          <Link to={"/forgotpassword"} className="link">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
