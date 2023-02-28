import React from "react";
//router
import { Routes, Route } from "react-router";
//layoutpages
import HAbout from "../landingpage/home/HAbout";
import Home from "../landingpage/home/Home";
import Team from "../landingpage/team/Team.jsx";
import ClientAgent from "../landingpage/Auth/Client-Agent";
import Contact from "../landingpage/contact/Conatct";
import Default from "../layouts/dashboard/default";

//Authentification
import SignIn from "../landingpage/Auth/sign-in";
import SignUp from "../landingpage/Auth/sign-up";
import Recoverpw from "../landingpage/Auth/recoverpw";
import LockScreen from "../landingpage/Auth/lock-screen";
import ConfirmMail from "../landingpage/Auth/confirm-mail";
//users
import UserProfile from "../views/dashboard/app/user-profile";
import UserAdd from "../views/dashboard/app/user-add";
import UserList from "../views/dashboard/app/user-list";
//special pages
import Calender from "../views/dashboard/special-pages/calender";
import Pricing from "../views/dashboard/special-pages/pricing";

// map
import Google from "../views/dashboard/maps/google";
const IndexRouters = () => {
  // const user = localStorage.getItem('user');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Habout" element={<HAbout />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Recoverpw" element={<Recoverpw />} />
        <Route path="LockScreen" element={<LockScreen />} />
        <Route path="confirmmail" element={<ConfirmMail />} />
        <Route path="ClientAgent" element={<ClientAgent />} />
        <Route path="dashboard" element={<Default />}>
          {/* user */}
          <Route path="user-add" element={<UserAdd />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="user-profile" element={<UserProfile />} />
          {/*special pages */}
          <Route path="pricing" element={<Pricing />} />
          <Route path="calendar" element={<Calender />} />
          {/* map */}
          <Route path="google" exact element={<Google />} />
        </Route>
      </Routes>
    </>
  );
};

export default IndexRouters;
