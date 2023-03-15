import "./LogInAndSignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase/firebase";
// import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    fullName: "",
    address: "",
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setInputState({
      ...inputState,
      [evt.target.name]: value,
    });
    console.log(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register");
    registerWithEmailAndPassword(inputState.email, inputState.password).then(
      (user) => {
        console.log(user);
        if (user) navigate("/user/login");
      }
    );
  };

  return (
      
      <div className="center">
        <h1>MIAMI MARKETPLACE</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              name="fullName"
              value={inputState.fullName}
              onChange={handleChange}
            />
            <span></span>
            <label>Full Name</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              name="address"
              value={inputState.address}
              onChange={handleChange}
            />
            <span></span>
            <label>Miami Address</label>
          </div>
          <div className="txt_field">
            <input
              type="email"
              required
              name="email"
              value={inputState.email}
              onChange={handleChange}
            />
            <span></span>
            <label>Email Address</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              name="password"
              value={inputState.password}
              onChange={handleChange}
            />
            <span></span>
            <label>Create a Password</label>
          </div>
          <input type="submit" value="Signup" />
        </form>
      </div>
  );
}

export default SignUp;
