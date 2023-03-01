import React, {useEffect} from 'react'
import {bindActionCreators} from "redux"


//header
import HeaderAgent from './HeaderStyleAgent/headerAgent'
//subheader
import SubHeaderAgent from './HeaderStyleAgent/sub-headerAgent'
//sidebar
import SidebarAgent from './SideBarStyleAgent/sidebarAgent'


import SettingOffcanvas from '../../components/partials/components/settingoffcanvas'
import Loader from '../../components/Loader'

// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"
import { Outlet } from 'react-router-dom'

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

const DefaultAgent = (props) => {
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
            <SidebarAgent />
                <main className="main-content">
                    <div className="position-relative">
                        <HeaderAgent />
                        <SubHeaderAgent />
                        <Outlet />
                    </div>
                        
                </main>
                
            {/* <SettingOffcanvas  /> */}
            
            
        </> 
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultAgent)
