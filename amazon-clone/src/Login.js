import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <NavLink to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </NavLink>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input type="text" />

          <h5>Password</h5>
          <input type="password" />

          <button className='login__signInButton'>Sign In</button>
        </form>

        <p>
          By Signing-in you agree to Amazon FAKE CLONE Conditions of Use & sale. Please
          see our privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>

        <button className="login__registerButton">Create your Amazon Account</button>
      </div>
    </div>
  );
};

export default Login;
