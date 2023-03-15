import "./HomePage.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Item({ item }) {
  return (
    <div>
      <span className="shop-item-title">{item.name}</span>
      <img className="shop-item-image" src={item.img_link} />
      <div className="shop-item-details">
        <div className="shop-item-price col-5">{item.price}</div>
        <button
          className="btn btn-primary shop-item-button col-5"
          type="button"
        >
          CONTACT SELLER
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  //   const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({});
  const getCategoryList = async () => {
    const response = await axios.get(`http://localhost:3000/categoryList`);
    setCategoryList(response.data);
  };
  useEffect(() => {
    getCategoryList();
    // console.log(categoryList);
  }, []);

  const getData = async (category) => {
    const response = await axios.get("http://localhost:3000/" + category);
    setData((prevData) => ({
      ...prevData,
      [category]: response.data,
    }));
  };
  useEffect(() => {
    for (const category of categoryList) {
      console.log(category);
      getData(category);
    }
  }, [categoryList]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container">
      <h1>Miami Marketplace</h1>
      {categoryList.map((category) => {
        if (data[category]) {
          return (
            <div className="row" key={category}>
              <section className="container content-section">
                <h2>{category}</h2>
                <div className="shop-items">
                  {data[category] &&
                    data[category].map((item) => {
                      return (
                        <div className="col-sm-5 shop-item" key={item.id}>
                          <Item item={item} />;
                        </div>
                      );
                    })}
                </div>
              </section>
            </div>
          );
        } else return null;
      })}
    </div>
  );
}

export default HomePage;
