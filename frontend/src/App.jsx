import {
  Route,
  Routes,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import "./App.css";
import ProtectedPostItem from "./components/ProtectiveRoutes/ProtectedPostItem";
import ProductDetail from "./components/ProductDetail";
import NavBar from "./components/NavBar";
import ProtectedFavoritePage from "./components/ProtectiveRoutes/ProtectedFavoritePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-component">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/create_order" element={<ProtectedPostItem />} />
        <Route path="/product/:product_id" element={<ProductDetail/>}/>
        <Route path="/user/favorite" element={<ProtectedFavoritePage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
