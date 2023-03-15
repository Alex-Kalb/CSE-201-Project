import "./LogInAndSignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase/firebase";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    uid: "",
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
    const user = await registerWithEmailAndPassword(inputState.email, inputState.password);
    if (user) {
      setInputState({
        ...inputState,
        ["uid"]: user.uid,
      });
      try {
        const {password, ...dataSent} = inputState
        const response = await axios.post("http://127.0.0.1:8000/account/add/", dataSent);
        if (response.status === 200) navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="center">
      <h1>MIAMI MARKETPLACE</h1>
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
  );
}

export default SignUp;
