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
    
      <div className="center">
        <h1>MIAMI MARKETPLACE</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member?
            <Link to="/user/signup" className="txt2 p-l-10">
              Signup
            </Link>
          </div>
        </form>
      </div>
  );
}

export default LogIn;
