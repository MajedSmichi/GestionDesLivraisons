import React from "react";
import client from "./client.jpg";
import agent from "./agent.jpg";
import "./ClientAgent.css";
import Header from "../header/Header"

import { Link } from "react-router-dom";
const ClientAgent = () => {
  return (
    <div style={{backgroundColor:"white",height:"100%"}}>
    <Header />  
    <div className="cards">
      <div className="card">
        <Link to="/SignIn/1">
          <img src={client} alt="client" className="img1" />
          <h1>Connect as Customer</h1>
        </Link>
      </div>
      <div className="card">
        <Link to="/SignIn/2">
          <img src={agent} alt="agent" className="img2" />
          <h1>Connect as Agent</h1>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ClientAgent;
