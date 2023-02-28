import React from "react"
import TeamCard from "./TeamCard"
import "./team.css"
import { Outlet } from "react-router-dom"



const Team = () => {
  return (
    <>
       
      <section className='team' id="team">
      <h1 >Our Current Delivery Team </h1>
        <div className='grid'>
          <TeamCard/>
        </div>
      </section>
      

    </>
  )
}

export default Team