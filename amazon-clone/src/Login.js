import React, { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = e => {
    e.preventDefault();

    // some fancy firebase login
  }
  
  const register = e => {
    e.preventDefault();

    //  some fancy firbase register shit
  }


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
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button className='login__signInButton' onClick={signIn} type="submit" >Sign In</button>
        </form>

        <p>
          By Signing-in you agree to Amazon FAKE CLONE Conditions of Use & sale. Please
          see our privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>

        <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
      </div>
    </div>
  );
};

export default Login;