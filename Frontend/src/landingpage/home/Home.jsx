import React from "react"
//import AboutCard from "../about/AboutCard"
import Team from "../team/Team"
import Hero from "./hero/Hero"
import Contact from "../contact/Conatct"
import Footer from "../footer/Footer.jsx"
import Header from "../header/Header"
import HAbout from "./HAbout"

const Home = () => {
  return (
    <div style={{backgroundColor:"white"}}>
      <Header />  
      <Hero/>
      <HAbout/>
      <Team/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home