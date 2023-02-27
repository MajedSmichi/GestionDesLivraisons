import React from "react"
import './HAbout.css'
import { Link } from "react-router-dom";



const HAbout = () => {
  return (
    <>
      <section className='homeAbout' id="Habout">
      <h1 className="title">About Us</h1>
        <p className="p">Delivery is your best solution to get your order smoothly!
        It gives the agent the possibility to find the customer's contact, the chance to organize their work and make their services faster.<br></br>
        Delivery helps the client and gives them the opportunity to find the best way to receive their needs.<br></br>
        So, <Link to="/ClientAgent"><strong className="loginnow">LOGIN NOW !</strong></Link> and make your LIFE SUPERIOR!</p>
      </section>
    </>
  )
}

export default HAbout