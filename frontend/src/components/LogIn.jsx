import "./styleAccount.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase/firebase";
// import axios from "axios";

function LogIn() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password).then((user) => {
      if (user) navigate('/');
    });
  };

  return (
    
    <body>
      <div class="center">
        <h1>Miami Marketplace</h1>
        <form onSubmit={handleSubmit}>
          <div class="txt_field">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div class="signup_link">
            <Link to="/" class="txt2 p-l-10">
              Use Logged Out
            </Link>
          </div>
          <input type="submit" value="Login" />
          <div class="signup_link">
            Not a member?
            <Link to="/user/signup" class="txt2 p-l-10">
              Signup
            </Link>
          </div>
        </form>
      </div>
      </body>
  );
}

export default LogIn;
