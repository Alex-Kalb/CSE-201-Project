import "./HomePage.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import { auth } from "../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


function Item(props) {
  const navigate = useNavigate();

  async function addToFavoriteAPI() {
    const response = await axios({
      url: "http://127.0.0.1:8000/user/add-to-favorite/",
      method: "post",
      data: {
        uid: props.uid,
        product_id: props.item.id
      }
    })

    if (response.status == 200) {
      alert(response.data);
    }
  }

  return (
    <div className="shop-item">
      <span className="shop-item-title">
        <div
          className="title-wrapper link"
          onClick={() => navigate(`/product/${props.item.id}`)}
        >
          {props.item.name}
        </div>
      </span>
      <img className="shop-item-image" src={props.item.img_link} />
      <div className="shop-item-details">
        <div className="shop-item-price col-4 mx-1">${props.item.price}</div>
        <div className="col-4 mx-1">
          <button className="btn btn-primary shop-item-button add-to-favorite" onClick={() => addToFavoriteAPI()}>
            ADD TO FAVORITE
          </button>
        </div>
        <div className="col-4 mx-1">
          <button
            className="btn btn-primary shop-item-button contact-seller"
            type="button"
          >
            CONTACT SELLER
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  //   const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({});
  const [filterConfig, setFilterConfig] = useState({});
  const getCategoryList = async () => {
    const response = await axios.get(
      "http://localhost:8000/product/list/category/"
    );
    setCategoryList(response.data);
  };
  useEffect(() => {
    getCategoryList();
    // console.log(categoryList);
  }, []);

  const getData = async (category) => {
    const request_url =
      "http://localhost:8000/product/category/" + category + "/";

    let response = await axios({
      method: "get",
      url: request_url,
      params: {
        sortBy: filterConfig.sortBy,
        search: filterConfig.search,
      },
    });
    setData((prevData) => ({
      ...prevData,
      [category]: response.data,
    }));
  };

  const getFilterConfig = (filterConfig) => {
    setFilterConfig(filterConfig);
  };
  useEffect(() => {
    for (const category of categoryList) {
      getData(category);
    }
  }, [categoryList, filterConfig]);
  if (loading) {
    return (
      <div className="loading-page">
        <h1>
          loading
        </h1>
      </div>
    )
  }
  return (
    <div className="container-fluid main-page">
      <div className="header-section">
        <FilterBar passFilterData={getFilterConfig} />
      </div>
      <div className="main-page">
        {categoryList.map((category) => {
          if (data[category]) {
            return (
              <div className="row" key={category}>
                <h2 className="category-heading">{category}</h2>
                {data[category] &&
                  data[category].map((item) => {
                    return (
                      <div className="col-3 shop-item-wrapper" key={item.id}>
                        <Item item={item} uid={user.uid}/>
                      </div>
                    );
                  })}
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
}

export default HomePage;
