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
        <h3>"Delivery" offers a creative solution for delivery management based on the use of advanced technologies.<br></br> The objective of this project is to enhance the efficiency of delivery management by utilizing innovative technologies to reduce costs and waiting times, while providing quality service to customers.
</h3>
        <Link to="/ClientAgent"><button className="buttonn">SUBSCRIBE NOW!</button></Link>
      </div>

      <div >
        <img src={image} alt="images"   />
      </div>
    </div>
  );
};

export default Hero;
