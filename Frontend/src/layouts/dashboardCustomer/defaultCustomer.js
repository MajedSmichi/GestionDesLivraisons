import React, {useEffect, useState} from 'react'
import {bindActionCreators} from "redux"


//header
import HeaderCustomer from './HeaderStyleCustomer/headerCustomer'
//subheader
import SubHeaderCustomer from './HeaderStyleCustomer/sub-headerCustomer'
//sidebar
import SidebarCustomer from './SideBarStyleCustomer/sidebarCustomer'


import SettingOffcanvas from '../../components/partials/components/settingoffcanvas'
import Loader from '../../components/Loader'

// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"
import { Outlet } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import axios from 'axios'
import { apiUrl } from '../../Constants'
const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})

const DefaultCustomer = (props) => {
    
    

    useEffect(() => {
        //   darkmode
        const colorMode = sessionStorage.getItem('color-mode');
        if(colorMode===null){
            props.ModeAction(props.darkMode);
        }
        else{
            props.ModeAction(colorMode);
        }

        // colocustomizermode
        const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
        const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
        const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
        if(colorcustomizerMode===null){
            props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
            document.documentElement.style.setProperty('--bs-info', props.cololrinfomode );
        }
        else{
            props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
            document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
        }

        // rtlmode
        const rtlMode = sessionStorage.getItem('rtl-mode');
        if(rtlMode===null){
            props.SchemeDirAction(props.schemeDirMode)
        }
        else{
            props.SchemeDirAction(rtlMode);
        }   
        })
   
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultCustomer)
