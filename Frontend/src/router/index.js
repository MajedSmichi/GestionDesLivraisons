import React from "react";
//router
import { Routes, Route } from "react-router-dom";
//layoutpages
import HAbout from "../landingpage/home/HAbout";
import Home from "../landingpage/home/Home";
import Team from "../landingpage/team/Team.jsx";
import ClientAgent from "../landingpage/Auth/Client-Agent";
import Contact from "../landingpage/contact/Conatct";
import Default from "../layouts/dashboard/default";
import DefaultAgent from "../layouts/dashboardAgent/defaultAgent";
import DefaultCustomer from "../layouts/dashboardCustomer/defaultCustomer";
//Authentification
import SignIn from "../landingpage/Auth/sign-in";
import SignUp from "../landingpage/Auth/sign-up";
import Recoverpw from "../landingpage/Auth/recoverpw";
import LockScreen from "../landingpage/Auth/lock-screen";
import ConfirmMail from "../landingpage/Auth/confirm-mail";
//users
import UserProfileAdmin from "../views/dashboard/admin/user-profileAdmin";
import UserProfileClient from "../views/dashboardClient/app/user-profileClient";
import UserProfileAgent from "../views/dashboradAgent/app/user-profileAgent";
import UserAdd from "../views/dashboard/app/user-add";
import AddAgent from "../views/dashboard/app/user-addAgent";
import UserList from "../views/dashboard/app/user-list";
//special pages
import CalenderClient from "../views/dashboardClient/special-pages/calenderClient";
import Calender from "../views/dashboard/special-pages/calender";
import Pricing from "../views/dashboard/special-pages/pricing";

// map
import Google from "../views/dashboard/maps/google";
import UserListAgent from "../views/dashboard/app/user-listAgent";
import GoogleAgent from "../views/dashboradAgent/maps/google";
import GoogleClient from "../views/dashboardClient/maps/google";

import ProtectedRoutes from "./privateRouter";
import PublicRoutes from "./publicRouter";
import DemandClient from "../views/dashboardClient/demand/demand";
import CalenderAgent from "../views/dashboradAgent/special-pages/calender";
import DemandAgent from "../views/dashboradAgent/demands/demands";
import Feedback from "../views/dashboardClient/feedBack/feedBack";
import Index from "../views/dashboard/index"
import IndexCustomer from "../views/dashboardClient/index"
import IndexAgent from "../views/dashboradAgent/index"
import FeedBackList from "../views/dashboradAgent/feedBack/feedBack";
import AdminFeedBackList from "../views/dashboard/feedBack/feedBackList";
import DemandList from "../views/dashboardClient/demand/demandList"


const IndexRouters = () => {
  return (
    <>
      <Routes>
        {/* public routers*/}
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="Habout" element={<HAbout />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="SignIn/:role" element={<SignIn />} />
          <Route path="SignUp/:role" element={<SignUp />} />
          <Route path="Recoverpw/:role" element={<Recoverpw />} />
          <Route path="LockScreen" element={<LockScreen />} />
          <Route path="confirmmail" element={<ConfirmMail />} />
          <Route path="ClientAgent" element={<ClientAgent />} />
        </Route>
        {/* private routers*/}
        <Route path="/" element={<ProtectedRoutes />}>
          
          <Route path="dashboard" element={<Default />}>
            {/* user */}
            <Route index={true} element={<Index/>} />
            <Route path="user-add" element={<UserAdd />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="user-listAgent" element={<UserListAgent />} />
            <Route path="addAgent" element={<AddAgent />} />
            <Route path="user-profileAdmin" element={<UserProfileAdmin />} />
            <Route path="AdminFeedBackList" element={<AdminFeedBackList/>}/>

            {/*special pages */}
            <Route path="pricing" element={<Pricing />} />
            <Route path="calendar" element={<Calender />} />
            {/* map */}
            <Route path="google" exact element={<Google />} />
          </Route>

          <Route path="dashboardAgent" element={<DefaultAgent />}>
            <Route index={true} element={<IndexAgent/>} />
            <Route path="user-profileAgent" element={<UserProfileAgent />} />
            <Route path="mapAgent" element={<GoogleAgent />} />
            <Route path="calendarAgent" element={<CalenderAgent/>} />
            <Route path="demandAgent" element={<DemandAgent/>} />
            <Route path="FeedBackList" element={<FeedBackList/>}/>
          </Route>

          <Route path="dashboardCustomer" element={<DefaultCustomer />}>
            <Route index={true} element={<IndexCustomer/>} />
            <Route path="user-profileClient" element={<UserProfileClient />} />
            <Route path="calendarClient" element={<CalenderClient />} />
            <Route path="mapClient" element={<GoogleClient />} />
            <Route path="demandClient" element={<DemandClient/>} />
            <Route path="demandList" element={<DemandList/>}></Route>
            <Route path="feedBack" element={<Feedback/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default IndexRouters;
