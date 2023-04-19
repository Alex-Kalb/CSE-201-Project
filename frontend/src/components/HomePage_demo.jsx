import "./styleMain.css";
import Dashboard from "./Dashboard";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="container" style={{ overflow: "scroll", height: "100vh" }}>
      <Dashboard />
      <h1>Miami Marketplace</h1>
      <div className="row">
        <section className="container content-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/search/${searchQuery}`)}
            >
              Search
            </button>
          </div>
          <h2>Furniture</h2>
          <div className="shop-items">
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">Bed Frame</span>
              <img
                className="shop-item-image"
                src="https://hips.hearstapps.com/hmg-prod/images/haven-bright-foot-1599077719.jpg?crop=0.619xw:1.00xh;0.185xw,0&resize=980:*"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$129.99</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">Desk</span>
              <img
                className="shop-item-image"
                src="https://target.scene7.com/is/image/Target/Desks_QUIVER-201014-1602702882213"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$99.99</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="row">
        <section className="container content-section">
          <h2>Books</h2>
          <div className="shop-items">
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">
                Micro Biology: The Human Experience
              </span>
              <img
                className="shop-item-image"
                src="https://i.ebayimg.com/images/g/QXsAAOSwSqRjbBFz/s-l500.jpg"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$13.99</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">Microeconomics in Context</span>
              <img
                className="shop-item-image"
                src="https://m.media-amazon.com/images/I/71tj6nuiBjL._AC_UF350,350_QL50_.jpg"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$86.36</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="row">


        <section className="container content-section">
  <h2>Electronics</h2>
  <div className="shop-items">
    <div className="col-sm-5 shop-item">
      <span className="shop-item-title">Ipad air 4th generation</span>
      <img
        className="shop-item-image"
        src="https://www.lifewire.com/thmb/q6j2M-E9tvixC82cWBYHpeszBaA=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc()/_hero_horiz_Apple-iPad-Air-4th-Generation-1-d02144f8233447e28f96969f0ac1459e.jpg"
      />
      <div className="shop-item-details">
        <div className="shop-item-price col-5">$500.00</div>
        <button
          className="btn btn-primary shop-item-button col-5"
          type="button"
        >
          CONTACT SELLER
        </button>
      </div>
    </div>
    <div className="col-sm-5 shop-item">
      <span className="shop-item-title">MacBook Air</span>
      <img
        className="shop-item-image"
        src="https://www.apple.com/v/mac/home/ar/images/overview/hero/macbook_air__fntj8q6us5qy_large.jpg"
      />
      <div className="shop-item-details">
        <div className="shop-item-price col-5">$999.00</div>
        <button
          className="btn btn-primary shop-item-button col-5"
          type="button"
        >
          CONTACT SELLER
        </button>
      </div>
    </div>
  </div>
</section>
     
     
      </div>
      <div className="row">
        <section className="container content-section">
          <h2>Clothes</h2>
          <div className="shop-items">
            <div className="col-5 shop-item">
              <span className="shop-item-title">
                Nike Air Force 1 Women's size 7
              </span>
              <img
                className="shop-item-image"
                src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4906dd0a-96d2-46d3-b70c-cd7c0227deef/air-force-1-07-womens-shoes-b19lqD.png"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$85.00</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
            <div className="col-5 shop-item">
              <span className="shop-item-title">Formal Dress Size Small</span>
              <img
                className="shop-item-image"
                src="https://cdn.shopify.com/s/files/1/1502/2532/products/tie-back-appliqued-sheath-pink-short-prom-dress-homecoming-dress-pd327-pgmdress-252414.jpg?v=1640591911"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$40.00</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="row">
        <section className="container content-section">
          <h2>Health & Fitness</h2>
          <div className="shop-items">
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">Lulu Lemon Yoga Mat</span>
              <img
                className="shop-item-image"
                src="https://images.lululemon.com/is/image/lululemon/LU9AB7S_0001_2"
              />
              <div className="shop-item-details" />
              <div className="shop-item-price col-5">$56.00</div>
              <button
                className="btn btn-primary shop-item-button col-5"
                type="button"
              >
                CONTACT SELLER
              </button>
            </div>
            <div className="col-sm-5 shop-item">
              <span className="shop-item-title">
                Hydro Flask Water Bottle 32oz
              </span>
              <img
                className="shop-item-image"
                src="https://s7d1.scene7.com/is/image/MoosejawMB/10481049x1013901_zm?$product1000$"
              />
              <div className="shop-item-details">
                <div className="shop-item-price col-5">$20.00</div>
                <button
                  className="btn btn-primary shop-item-button col-5"
                  type="button"
                >
                  CONTACT SELLER
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
  );
}

export default HomePage;
