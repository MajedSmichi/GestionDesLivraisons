import React from "react";
//router
import { Routes, Route } from "react-router";
//layoutpages
import HAbout from "../landingpage/home/HAbout"
import Home from "../landingpage/home/Home";
import Team from "../landingpage/team/Team.jsx";
import ClientAgent from "../landingpage/Auth/Client-Agent";
import Contact from "../landingpage/contact/Conatct";
import Default from "../layouts/dashboard/default";
import Horizontal from "../layouts/dashboard/horizontal";
import Simple from "../layouts/dashboard/simple";
import SignIn from "../landingpage/Auth/sign-in";
import SignUp from "../landingpage/Auth/sign-up";
import Recoverpw from "../landingpage/Auth/recoverpw";
import LockScreen from "../landingpage/Auth/lock-screen";
import ConfirmMail from "../landingpage/Auth/confirm-mail"
const IndexRouters = () => {


  // const user = localStorage.getItem('user');
  
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />}>  
        </Route>
        <Route path='/Habout' element={<HAbout/>}/>
        <Route path='/team' element={<Team/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Recoverpw" element={<Recoverpw/>}/>
        <Route path="/LockScreen" element={<LockScreen/>}/>
        <Route path="/confirmmail" element={<ConfirmMail/>}/>
        <Route path="/ClientAgent" element={<ClientAgent/>}/>
        <Route path="/dashboard" element={<Default/>}></Route>
        <Route path="/horizontal" element={<Horizontal/>}></Route>
        <Route path="/auth" element={<Simple/>}></Route>
        <Route path="/errors" element={<Simple/>}></Route>
      </Routes>
    </>
  );
};

export default IndexRouters;
