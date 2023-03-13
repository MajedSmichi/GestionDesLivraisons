import React from "react";

//header
import HeaderAgent from "./HeaderStyleAgent/headerAgent";
//subheader
import SubHeaderAgent from "./HeaderStyleAgent/sub-headerAgent";
//sidebar
import SidebarAgent from "./SideBarStyleAgent/sidebarAgent";

import { Outlet } from "react-router-dom";

const DefaultAgent = () => {
  return (
    <>
      <SidebarAgent />
      <main className="main-content">
        <div className="position-relative">
          <HeaderAgent />
          <SubHeaderAgent />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DefaultAgent;
