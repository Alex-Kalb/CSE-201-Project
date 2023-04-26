import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";


import "./FavoritePage.css";
import { useNavigate } from "react-router-dom";

function FavoritePage() {
  const [user, loading, error] = useAuthState(auth);
  const [favoriteList, setFavoriteList] = useState();
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function fetchFavoriteList() {
    const resposne = await axios({
      url: "http://127.0.0.1:8000/user/get-all-favorite/",
      method: "get",
      params: {
        uid: user.uid,
      },
    });

    setFavoriteList(resposne.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchFavoriteList();
  }, []);
  return (
    <div className="favorite-page">
      <div className="main-page">
        <h1>Your Favorite List</h1>
        <div className="item-listing">
          {favoriteList &&
            favoriteList.map((item, idx) => {
              return (
                <div
                  className="row my-2 item-row"
                  key={idx}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="col-7">
                    <h5>{item.name}</h5>
                    <p>{item.price}</p>
                  </div>
                  <div className="col-5">
                    <button
                      type="button"
                      className="btn btn-danger ms-auto col-6"
                      name={item.list_id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <button type="button" className="btn btn-primary">
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default FavoritePage;
