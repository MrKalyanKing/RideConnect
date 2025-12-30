import React from "react";
import "./Home.css";
import bg from "../../assets/HomePage.png";
import logo from "../../assets/Rc.png";
import logo1 from "../../assets/Logomain.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="main-logo"><img src={logo1} alt="main logo" /></div>
      <div className="bg-img">
        <img src={bg} alt="background" />
      </div>
      <div className="content">
        <div className="logo-img">
          <img src={logo} alt="logo" />
        </div>
        <div className="logo-txt">The Future of Ride Sharing</div>
      </div>

      <div className="get-started-btn">
        <button className="btn"> <Link to="/customer/signup" >Get Started</Link> </button>
        <button className="btn" > <Link to="/captain/login">Captain Login</Link></button>
      </div>
    </div>
  );
};

export default Home;
