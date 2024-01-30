import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Layout from "./Layout";
import Payment from "./Payment";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Oe0bmSBZeUT2YDXZlUE22P6q2Kb2UsNf3wlFkb3nmsUPyc2Z3fUNvIZHwuwFvqmlatyZrfc8SRHepADOjyfbA1I00SUCRI59G"
);

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads....

    auth.onAuthStateChanged((authUser) => {
      console.log("The USER IS >>> ", authUser);

      if (authUser) {
        // The user just logged in / the user was loggin in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
