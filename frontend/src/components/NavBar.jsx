import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { HiOutlineHeart } from "react-icons/hi";
import axios from "axios";
import { auth, logout } from "../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


function NavBar(props) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  async function LogOutAPICall() {
    const response = await axios({
      url: "http://localhost:3000/users/logout",
      method: "get",
      withCredentials: true,
    })
  }

  function LogOut() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    console.log(user);
  }, [user])
  
  return (
    <div className="container-fluid navbar-container">
      <div className="brand">
        Miami Marketplace
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarText1">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/')}>
                  Home
                </a>
              </li>
            </ul>
            {user ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-link mx-50" style={{ display: "flex", alignItems: "center" }} onClick={()=>navigate('/user/favorite')}>
                  <HiOutlineHeart size={25}/>
                  <div className="user-email">
                    {user.email}
                  </div>
                </li>
                <li className="nav-item mx-50">
                  <button
                    type="button"
                    className="btn btn-primary navbar-button"
                    onClick={LogOut}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-50">
                  <Link to="/user/login" relative="path">
                    <button type="button" className="btn btn-primary navbar-button">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item mx-50">
                  <Link to="/user/signup" relative="path">
                    <button type="button" className="btn btn-primary navbar-button">
                      Register
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;