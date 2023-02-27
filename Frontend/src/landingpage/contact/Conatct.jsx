import React from "react";
import "./contact.css";

const Contact = () => {
  
  return (
    <>
      <section className="section-contact" id="contact">
        <h1 className="title">Contact Us</h1>
        <div className="">
          <div className="information">
            <p>We're open for any suggestion or just to have a chat</p>
            <div className="">
              <div className="">
                <h4>ADDRESS:</h4>
                <p>11 rue Alferdaous Ezzahra Ben Arous, Ezzahra, Tunisia</p>
              </div>
              <div className="">
                <h4>EMAIL:</h4>
                <p>smichimajed@gmail.com</p>
              </div>
              <div className="">
                <h4>PHONE:</h4>
                <p>+216 56146795</p>
              </div>
            </div> 

          </div>
        </div> 

      </section>
    </>
  );
};

export default Contact;
