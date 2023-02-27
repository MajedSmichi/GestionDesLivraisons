import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
 

  return (
    <header style={{backgroundColor:"white"}}>
      <nav>
        <h1 className="titlee">Delivery</h1>
        <ul
          className={click ? "mobile-nav" : "flexSB"}
          onClick={() => setClick(false)}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/#Habout">About</a>
          </li>
          <li>
            <a href="/#team">Team</a>
          </li>
          <li>
            <a href="/#contact">Contact</a>
          </li>
          <li>
            <Link to="/ClientAgent">Login</Link>
          </li>
        </ul>
      </nav>
      <button className="toggle" onClick={() => setClick(!click)}>
        {click ? (
          <i className="fa fa-times"> </i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </button>
    </header>
  );
};

export default Header;
