import React from "react";
import client from "./client.jpg";
import agent from "./agent.jpg";
import "./ClientAgent.css";
import Header from "../header/Header"

import { Link } from "react-router-dom";
const ClientAgent = () => {
  return (
    <div style={{backgroundColor:"white"}}>
    <Header />  
    <div className="cards">
      <div >
        <Link to="/SignIn">
          <img src={client} alt="client" className="img1" />
          <h1>Connect as Customer</h1>
        </Link>
      </div>
      <div>
        <Link to="/SignIn">
          <img src={agent} alt="agent" className="img2" />
          <h1>Connect as Agent</h1>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ClientAgent;
