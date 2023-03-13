import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LogIn from './components/LogIn';
import SignUp from './components/SignUp'
import HomePage from './components/HomePage';
import './App.css'

function App() {

  return (
    <div className="container">
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/login" element={<LogIn />} />
          <Route path="/user/signup" element={<SignUp />} />
          {/* <Route path="/product/add" element={<ProtectedRouteAddProduct />} />
          <Route path="/user/feed" element={<ProtectedRouteDashboard />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
