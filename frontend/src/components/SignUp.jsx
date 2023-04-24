import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase/firebase";
import axios from "axios";
import "./styleAccount.css";

function SignUp() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register");
    const user = await registerWithEmailAndPassword(
      inputState.email,
      inputState.password
    );
    if (user) {
      try {
        const { password, ...dataSent } = inputState;
        const response = await axios.post("http://localhost:8000/account/add/", {
          ...dataSent,
          ["uid"]: user.uid,
        });
        if (response.status === 200) navigate("/user/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <title>Animated Signup Form</title>
        <link rel="stylesheet" href="styleAccount.css" />
      </head>
      <body>
        <div className="center">
          <h1>Miami Marketplace</h1>
          <form onSubmit={handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                required
                name="name"
                value={inputState.name}
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
      </body>
    </html>
  );
}

export default SignUp;