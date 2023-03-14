import React from 'react'
//router
import IndexRouters from "./router/index";

//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/customizer.scss";

export const UserContext = React.createContext({});

function App() {
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsApp: "",
    adresse: "",
    photo:"",
    // joindate: new Date().toISOString()
    dateOfBirth:"",
  });
  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <IndexRouters />
      </UserContext.Provider>
    </div>
  );
}

export default App;
