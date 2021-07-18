import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function ForgotPass() {
  const invalidEmail = document.querySelector(".invalid");
  const validEmail = document.querySelector(".valid");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const connect = await fetch(
      process.env.CLIENT_SERVER,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json" },
      }
    );
    status(connect);
  };

  const status = (res) => {
    if (res.status === 200) {
      validEmail.classList.remove("hidden");
      setTimeout(() => {
        validEmail.classList.add("hidden");
        history.push("/");
      }, 4000);
    } else {
      invalidEmail.classList.remove("hidden");
      setTimeout(() => {
        invalidEmail.classList.add("hidden");
      }, 1000);
    }
  };

  return (
    <div className="card card__">
      <span className="title">Forgot Password?</span>
      <div className="forgot-img">
        <img
          src="/imgs/key.jpg"
          className="card-img-top real-img"
          alt="forgotpassword-img"
        />
      </div>

      <div className="card-body">
        <p className="hidden invalid">
          <small className="text-danger">
            Invalid email. Please try again.
          </small>
        </p>
        <p className="hidden valid">
          <small className="text-success">
            We have sent you a link on your email. Please check and verify.
          </small>
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
          </div>
          <button type="submit" className="btn btn-success my-2">
            Reset
          </button>
        </form>
        <div className="links">
          <Link to={"/"} className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
