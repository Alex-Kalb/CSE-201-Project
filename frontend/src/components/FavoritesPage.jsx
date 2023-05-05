import "./styleMain.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth";


function Item({ item }) {
  const [user, loading, error] = useAuthState(auth);
  const [isOwnedByUser, setIsOwnedByUser] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (user && user.uid) {
      // Check if the item is in the user's cart
      axios
        .get(`http://localhost:8000/cart/contains/${item.id}/`, {
          params: { uid: user.uid },
        })
        .then((response) => {
          if (response.status === 200) {
            setFavorited(response.data.contains);
          } else {
            console.log("Error checking if item is in cart:", response.status);
          }
        })
        .catch((error) => {
          console.log("Error checking if item is in cart:", error);
        });

      // Check if the item belongs to the authenticated user
      axios
        .get(`http://localhost:8000/product/${item.id}/account/`, {
          params: { uid: user.uid }
        })
        .then((response) => {
          if (response.status === 200) {
            setIsOwnedByUser(response.data.uid === user.uid);
          } else {
            console.log("Error checking if item belongs to user:", response.status);
          }
        })
        .catch((error) => {
          console.log("Error checking if item belongs to user:", error);
        });
    }
  }, [user, item.id]);

  const handleFavorite = async () => {
    if (!user) {
      alert("You need to log in first to favorite an item!");
      return;
    }

    setFavorited(!favorited);

    if (!favorited) {
      axios
        .post(`http://localhost:8000/cart/add/${item.id}/`, { uid: user.uid })
        .then((response) => {
          if (response.status === 200) alert("Item is Favorited!");
          else alert("There was an error favoriting this item!");
        })
        .catch((error) => {
          console.log("Error adding item to cart:", error);
        });
    } else {
      axios
        .post(`http://localhost:8000/cart/remove/${item.id}/`, { uid: user.uid })
        .then((response) => {
          if (response.status === 200) alert("Item is Unfavorited!");
          else alert("There was an error unfavoriting this item!");
        })
        .catch((error) => {
          console.log("Error removing item from cart:", error);
        });
    }
  };

  const handleContact = async () => {

    if (!isOwnedByUser) {
      axios
        .get(`http://localhost:8000/product/${item.id}/email/`)
        .then((response) => {
          if (response.data.email) {
            window.location.href = `mailto:${response.data.email}`;
          } else {
            window.alert('Seller email not found.');
          }
        })
        .catch((error) => {
          console.log('Error getting seller email:', error);
        });
    } else {
      axios
        .delete(`http://localhost:8000/product/${item.id}/remove/`)
        .then((response) => {
          if (response.status === 200) alert("Item is Deleted!");
          else alert("There was an error deleting this item!");
        })
        .catch((error) => {
          console.log("Error deleting this item:", error);
        });
    }
  };

  return (
    <div key={item.id} class="shop-item">
      <span class="shop-item-title">{item.name}</span>
      <img class="shop-item-image" src={item.img_link} />
      <div class="shop-item-details">
        <span class="shop-item-price">${item.price}</span>
        <button
          class="btn btn-primary shop-item-button"
          type="button"
          style={{ width: "120px", margin: "0 5px" }}
          onClick={handleFavorite}
        >
          {favorited ? "Unfavorite" : "Favorite"}
        </button>
        <button
          class="btn btn-primary shop-item-button"
          type="button"
          style={{ width: "120px", margin: "0 5px" }}
          onClick={handleContact}
        >
          {isOwnedByUser ? "Delete" : "Contact Seller"}
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = () => {
    alert("You are now logged out!");
    auth.signOut();
  };

  const getCategoryList = async () => {
    const response = await axios.get(
      "http://localhost:8000/product/list/category/"
    );
    setCategoryList(response.data);
  };

  const getData = async (category) => {
    const request_url = "http://localhost:8000/cart/items/" + category + "/";
    const response = await axios.get(request_url, {
      params: { uid: user.uid },
    });
    setData(prevData => ({
      ...prevData,
      [category]: response.data.filter(item => item.category === category)
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

  const filteredData = (selectedCategory ? [selectedCategory] : categoryList).reduce((acc, category) => {
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

  const handleUploadItem = () => {
    if (user) {
      navigate("/user/create_order");
    } else {
      alert("Please log in first to upload an item.");
    }
  }

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <html>
      <header class="main-header">
        <nav class="nav main-nav">
          <ul>
            {user ? (
              <li>
                <Link to="#" onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/user/login">Log In</Link>
              </li>
            )}
            <li>
              <a onClick={handleUploadItem}>Upload Item</a>
            </li>
            <li>
              <Link to="/">Home Page</Link>
            </li>
          </ul>
        </nav>
        <h1 class="web-name web-name-large">Miami Marketplace</h1>
        <nav class="nav bottom-nav">
          <li><a onClick={() => setSelectedCategory(null)}>All Items</a></li>
          <li><a onClick={() => handleCategorySelection('Clothing')}>Clothing</a></li>
          <li><a onClick={() => handleCategorySelection('Furniture')}>Furniture</a></li>
          <li><a onClick={() => handleCategorySelection('Books')}>Books</a></li>
          <li><a onClick={() => handleCategorySelection('Electronics')}>Electronics</a></li>
          <li><a onClick={() => handleCategorySelection('Pets')}>Pet Supplies</a></li>
          <li><a onClick={() => handleCategorySelection('Exercise')}>Exercise Equipment</a></li>
          <div class="search-container">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="search-bar" />
          </div>
        </nav>
      </header>

      <div class="sort">
        <label for="sort-options">Sort by: </label>
        <select name="sort-type" id="sort-type" onChange={handleSort}>
          <option>Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {Object.entries(filteredData).map(([category, items]) => {
        return (
          <section class="container content-section">
            <h2 class="section-header">{category}</h2>
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
