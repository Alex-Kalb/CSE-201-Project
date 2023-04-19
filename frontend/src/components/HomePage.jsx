import "./HomePage.css";
import Dashboard from "./Dashboard";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Item({ item }) {
  return (
    <div className="shop-item">
      <Link to={`/item/${item.id}`} className="shop-item-title">
        {item.name}
      </Link>
      <img className="shop-item-image" src={item.img_link} />
      <div className="shop-item-details">
        <div className="shop-item-price">${item.price}</div>
        <div className="shop-item-buttons">
          <button className="btn btn-primary shop-item-button" type="button" style={{ width: '120px', margin: '0 5px' }}>
            Favorite
          </button>
          <button className="btn btn-primary shop-item-button" type="button" style={{ width: '120px', margin: '0 5px' }}>
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  const getCategoryList = async () => {
    const response = await axios.get(
      "http://localhost:8000/product/list/category/"
    );
    setCategoryList(response.data);
  };

  const getData = async (category) => {
    const request_url =
      "http://localhost:8000/product/category/" + category + "/";
    const response = await axios.get(request_url);
    setData((prevData) => ({
      ...prevData,
      [category]: response.data,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    for (const category of categoryList) {
      getData(category);
    }
  }, [categoryList]);

  const filteredData = categoryList.reduce((acc, category) => {
    if (data[category]) {
      const filteredItems = data[category].filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length) {
        if (sortOrder === "name") {
          filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "price") {
          filteredItems.sort((a, b) => a.price - b.price);
        }
        acc[category] = filteredItems;
      }
    }
    return acc;
  }, {}); 

  return (
    <div className="container" style={{ overflow: "scroll", height: "95vh" }}>
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary">Favorites</button>
        </div>
        <div className="col-md-6 text-right">
          <button className="btn btn-primary">Logout</button>
        </div>
      </div>
      <Dashboard setSortOrder={setSortOrder} />
      <h1>Miami Marketplace</h1>
      <div className="row">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      {Object.entries(filteredData).map(([category, items]) => {
        return (
          <div className="row" key={category}>
            <section className="container content-section">
              <h2>{category}</h2>
              <div className="shop-items">
                {items.map((item) => {
                  return (
                    <div className="col-sm-5 shop-item" key={item.id}>
                      <Item item={item} />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;  