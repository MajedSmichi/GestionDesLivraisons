import React from "react"
import liv1 from "./image/liv1.jpg"
import liv2 from "./image/liv2.jpg"
import liv3 from "./image/liv3.jpg"
import liv4 from "./image/livr4.jpg"

const TeamCard = () => {
  return (
    <>
          
        <div className='items shadow'>
          <div className='img'>
            <img src={liv1} alt='liv1' />
          </div>
          <div className='details'>
            <h2>YASSINE LAARAIEDH</h2>
            <p>DELIVRER</p>
          </div>
        </div>
        <div className='items shadow'>
          <div className='img'>
            <img src={liv2} alt='liv2' />
          </div>
          <div className='details'>
            <h2>MAJID BOUGIRRA</h2>
            <p>DELIVRER </p>
          </div>
        </div>
        <div className='items shadow'>
          <div className='img'>
            <img src={liv3} alt='liv3' />
          </div>
          <div className='details'>
            <h2>HAYKEL SGHAYER</h2>
            <p>DELIVRER</p>
          </div>
        </div>
        <div className='items shadow'>
          <div className='img'>
            <img src={liv4} alt='liv4' />
          </div>
          <div className='details'>
            <h2>AHMED CHOUCHEN</h2>
            <p>DELIVRER</p>
          </div>
        </div>
      
    </>
  )
}

export default TeamCard