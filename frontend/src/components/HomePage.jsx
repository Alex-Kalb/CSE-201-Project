import "./styleMain.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Item({ item }) {
  return (
    <div class="shop-item">
      <span class="shop-item-title">
        {item.name}
      </span>
      <img class="shop-item-image" src={item.img_link} />
      <div class="shop-item-details">
        <span class="shop-item-price">${item.price}</span>
          <button class="btn btn-primary shop-item-button" type="button" style={{ width: '120px', margin: '0 5px' }}>
            Favorite
          </button>
          <button class="btn btn-primary shop-item-button" type="button" style={{ width: '120px', margin: '0 5px' }}>
            Contact Seller
          </button>
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

  const handleSort = (e) => {
    setSortOrder(e.target.value);
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
    <html>
      <header class="main-header">
            <nav class="nav main-nav">
                <ul>
                    <li><a href="MiamiMarketplaceLogIn.html">Log In</a></li>
                    <li><a href="FavoritePage.html">Favorites Page</a></li>
                </ul>
            </nav>
            <h1 class="web-name web-name-large">Miami Marketplace</h1>
            <nav class="nav bottom-nav">
                <li><a href="HomePage.html">Home</a></li>
                <li><a href="Womens.html">Women's Apparel</a></li>
                <li><a href="Mens.html">Men's Apparel</a></li>
                <li><a href="dorm.html">For the Dorm</a></li>
                <li><a href="house.html">For the House</a></li>
                <li><a href="textbooks.html">Textbooks</a></li>
                <li><a href="electronics.html">Electronics</a></li>
                <input type="text" placeholder="Search.." value={searchQuery} onChange={handleSearch}/>
            </nav>
        </header>

        <div class="sort">
            <label for="sort-options">Sort by</label>
            <select name="sort-type" id="sort-type" onChange={handleSort}>
                <option>Newest</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>
        </div>
      
      {Object.entries(filteredData).map(([category, items]) => {
        return (
            <section class="container content-section">
              <h2 class = "section-header">{category}</h2>
              <div class="shop-items">
                {items.map((item) => {
                  return (
                      <Item item={item} />
                  );
                })}
              </div>
            </section>
        );
      })}
      </html>
  );
}

export default HomePage;  