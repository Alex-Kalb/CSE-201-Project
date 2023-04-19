import { useState, Link } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import HomePage_demo from "./components/HomePage_demo";
import PostItem from "./components/PostItem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/demo/home" element={<HomePage_demo />} />
          <Route path="/user/login" element={<LogIn />} />
          <Route path="/user/create_order" element={<PostItem />} />
          <Route path="/user/signup" element={<SignUp />} />
        </Routes>
      </Router>
      {/* <div className="container">
      <div class="row">
        <div class="col">
          <Link to="/" className="txt2 p-l-10">
            Home
          </Link>
        </div>
        <div class="col">
          <a>Orders & Returns</a>
        </div>
        <div class="col">
          <Link to="/user/login" className="txt2 p-l-10">
            Login
          </Link>
        </div>
        <div class="col">
          <p>Help</p>
        </div>
      </div>
      </div> */}
      
    </div>
  );
}

export default App;
