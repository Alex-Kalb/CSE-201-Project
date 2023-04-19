import "./styleAccount.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth";

function PostItem() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    product_name: "",
    category: "",
    condition: "",
    price: 0,
    img_link: ""
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setInputState({
      ...inputState,
      [evt.target.name]: value,
    });
    console.log(evt.target.value);
  }

  const postData = async (data) => {
    axios.post("http://localhost:8000/user/create_order/", {...inputState, ["uid"]: user.uid})
    .then((response) => {
        if (response.status === 200) alert("Post items successfully!");
        else alert("Post Item failed. Please try again!");
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(inputState);
  };

  return (
      
      <div className="center">
        <h1>MIAMI MARKETPLACE</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              name="product_name"
              value={inputState.product_name}
              onChange={handleChange}
            />
            <span></span>
            <label>Product Name</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              name="category"
              value={inputState.category}
              onChange={handleChange}
            />
            <span></span>
            <label>Category</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              name="condition"
              value={inputState.condition}
              onChange={handleChange}
            />
            <span></span>
            <label>Condition</label>
          </div>
          <div className="txt_field">
            <input
              type="number"
              required
              name="price"
              value={inputState.price}
              onChange={handleChange}
            />
            <span></span>
            <label>Price</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              name="img_link"
              value={inputState.img_link}
              onChange={handleChange}
            />
            <span></span>
            <label>Image Link</label>
          </div>
          <input type="submit" value="Post Item" />
        </form>
      </div>
  );
}

export default PostItem;
