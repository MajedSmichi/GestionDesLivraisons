import React from 'react'



//header
import HeaderCustomer from './HeaderStyleCustomer/headerCustomer'
//subheader
import SubHeaderCustomer from './HeaderStyleCustomer/sub-headerCustomer'
//sidebar
import SidebarCustomer from './SideBarStyleCustomer/sidebarCustomer'




// // store
// import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
// import {connect} from "react-redux"
 import { Outlet } from 'react-router-dom'

// import { useParams } from 'react-router-dom';
// import axios from 'axios'
// import { apiUrl } from '../../Constants'

const DefaultCustomer = (props) => {
    
    return (
        <>
            {/* <Loader/> */}
            <SidebarCustomer />
                <main className="main-content">
                    <div className="position-relative">
                        <HeaderCustomer />
                        <SubHeaderCustomer />
                        <Outlet />
                    </div>
                        
                </main>
                
            {/* <SettingOffcanvas  /> */}
            
            
        </> 
    )
}

export default DefaultCustomer;
