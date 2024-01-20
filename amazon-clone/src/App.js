import './App.css';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Layout from './Layout';
import Payment from './Payment';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';


// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads....

    auth.onAuthStateChanged(authUser => {
      console.log("The USER IS >>> ", authUser)
    
      if (authUser){
        // The user just logged in / the user was loggin in
        dispatch({
          type:"SET_USER",
          user: authUser
        })
      } else {
        // The user is logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])

  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path='/payment' element={<Payment/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
