import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import './ProductDetail.css';

function ProductDetail() {
  const [user, loading, errror] = useAuthState(auth);
  const navigate = useNavigate();
  const params = useParams();
  const [productInfo, setProductInfo ] = useState({});

  async function getProductInfo() {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8000/product/${params.product_id}`,
    })
    
    setProductInfo({
      product_id: params.product_id,
      product_name: response.data.name,
      price: response.data.price,
      condition: response.data.condition,
      img_link: response.data.img_link,
      category: response.data.category
    });
  }

  async function postFavorite() {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/user/add-to-favorite/',
      data: {
        uid: user.uid,
        product_id: productInfo.product_id,
      }
    })

    if (response.status == 200)
      alert("Add item to favorite list successfully");
  }

  function add_to_favorite(evt) {
    if (user) {
      postFavorite();
    } else {
      navigate('/user/login');
    }
  }

  useEffect(()=>{
    getProductInfo();
  },[])
  return (
    <div className="main-page">
      <div className="row">
        <div className="col-6">
          <img className="product-img" src={productInfo.img_link} />
        </div>
        <div className="col-6">
          <h4 className="product-heading">{productInfo.product_name}</h4>
          <span className="product-price">${productInfo.price}</span>
          <span className="product-price">${productInfo.condition}</span>
          <div className="row">
            <button
                className="btn btn-primary shop-item-button col-5"
                type="button"
                onClick={add_to_favorite}
            >
                ADD TO FAVORITES
            </button>
            <button
                className="btn btn-primary shop-item-button col-5"
                type="button"
            >
                CONTACT SELLER
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
