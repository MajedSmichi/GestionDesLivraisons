import React, { createContext, useEffect, useState } from "react";
//router
import IndexRouters from "./router/index";


//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/customizer.scss";
import axios from "axios";
import { apiUrl } from "./Constants";

export const agentContext = createContext({});
export const customerContext = createContext({});
export const adminContext = createContext({});
function App() {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsApp: "",
    adresse: "",
    photo: "",
    dateOfBirth: "",
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsApp: "",
    adresse: "",
    photo: "",
    // joindate: new Date().toISOString()
    dateOfBirth: "",
  });
  const [agentData, setAgentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsApp: "",
    adresse: "",
    vehicule: "",
    idCard: "",
    dateOfBirth: "",
    photo: "",
    permissions:""
  });

  const updateLocation = ()=>{
    try {
      const token = localStorage.getItem("token");
      const role =localStorage.getItem('role');
      if (navigator.geolocation && token && (role==="1"||role==="2")) {
        
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          await axios.put(`${apiUrl}/users/update-location`, {
            latitude: coords.latitude + "",
            longitude: coords.longitude + "",
          },{
            headers:{
              Authorization: token
            }
          });
        });
      }
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(() => {
    let id = setInterval(() => {
      updateLocation();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="App">
      <customerContext.Provider value={{ userData, setUserData }}>
        <agentContext.Provider value={{ agentData, setAgentData }}>
          <adminContext.Provider value={{ adminData, setAdminData }}>
            <IndexRouters />
          </adminContext.Provider>
        </agentContext.Provider>
      </customerContext.Provider>
    </div>
  );
}

export default App;
