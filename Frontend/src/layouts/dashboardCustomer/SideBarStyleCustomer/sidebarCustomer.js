import React from 'react'
import { Link } from 'react-router-dom'
import VerticalNavCustomer from './vertical-navCustomer'




const SidebarCustomer = (props) => {
    
    
    
    
    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }
    
    

    return (
        <>
            <aside className="sidebar sidebar-default navs-rounded-all {{ sidebarVariants }}">
                <div className="sidebar-header d-flex align-items-center justify-content-start">
                    <Link to="/dashboard" className="navbar-brand">

                        <h4 className="logo-title">Delivery</h4>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar} >
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </i>
                    </div>
                </div>
                <div className="pt-0 sidebar-body data-scrollbar" data-scroll="1" id="my-scrollbar">
                    {/* sidebar-list class to be added after replace css */}
                    <div className="sidebar-list navbar-collapse" id="sidebar">
                      <VerticalNavCustomer/>
                    </div>
                </div>
                <div className="sidebar-footer"></div>
            </aside>
        </>
    )
}

export default SidebarCustomer

