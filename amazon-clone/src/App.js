import './App.css';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Layout from './Layout';
import Login from './Login';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="/checkout" element={<Checkout/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
