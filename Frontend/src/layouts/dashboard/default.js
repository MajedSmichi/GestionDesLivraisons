import React from 'react'



//header
import Header from './HeaderStyle/header'
//subheader
import SubHeader from './HeaderStyle/sub-header'
//sidebar
import Sidebar from './SidebarStyle/sidebar'



import { Outlet } from 'react-router-dom'
import Index from "../../views/dashboard/index"



const Default = () => {
   




    return (
        <>

            <Sidebar />
                <main className="main-content">
                    <div className="position-relative">
                        <Header />
                        <SubHeader />
                        
                        <Outlet />
                    </div>       
                </main> 
        </> 
    )
}

export default Default
