import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const signIn = e => {
    e.preventDefault();
    auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
          navigate("/")
        })
        .catch(error => alert(error.message))
    // some fancy firebase login
  }
  
  const register = e => {
    e.preventDefault();

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          //  It successfully created a new user with email and password
          console.log(auth)
          if (auth) {
            navigate("/")
          }
        })
        .catch(error => alert(error.message))
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
          By Signing-in you agree to Amazon FAKE CLONE Conditions of Use & Sale. Please
          see our privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>

        <button onClick={register} className="login__registerButton">Create your Amazon account</button>
      </div>
    </div>
  );
};

export default Login;
