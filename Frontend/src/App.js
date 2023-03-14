import React, { useEffect } from "react";
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

export const UserContext = React.createContext({});

function App() {
  const [userData, setUserData] = React.useState({
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

  useEffect(() => {
    let id = setInterval(() => {
      const user = localStorage.getItem("user");
      if (navigator.geolocation && user) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          await axios.put(`${apiUrl}/users/update-location/${user}`, {
            latitude: coords.latitude + "",
            longitude: coords.longitude + ""
          });
        });
      }
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <IndexRouters />
      </UserContext.Provider>
    </div>
  );
}

export default App;
