import React from "react";
// import Heading from "../../common/heading/Heading"
import "./Hero.css";
import { Link } from "react-router-dom";
import image from "./8309.jpg";

const Hero = () => {
  return (
    <div className="majed1">
      <div style={{textAlign:'center'}}>
        <h1>WELCOME TO DELIVERY</h1>
        <Link to="/ClientAgent"><button className="buttonn">SUBSCRIBE NOW!</button></Link>
      </div>

      <div >
        <img src={image} alt="images"   />
      </div>
    </div>
  );
};

export default Hero;
