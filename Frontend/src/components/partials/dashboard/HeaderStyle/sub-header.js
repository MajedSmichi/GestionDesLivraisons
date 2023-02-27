import React, {useEffect} from 'react'
import { Row,Col,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {bindActionCreators} from "redux"
//img
import topHeader from '../../../../assets/images/dashboard/top-header.png'

// store
import {NavbarstyleAction, getDirMode, SchemeDirAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../../../store/setting/setting'
import {connect} from "react-redux"

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
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
        },
        dispatch
    )
})


const SubHeader = (props) => {

    useEffect(() => {
        // navbarstylemode
       const navbarstyleMode = sessionStorage.getItem('Navbarstyle-mode');
       props.NavbarstyleAction(navbarstyleMode);
 })
    return (
        <>
            <div className="iq-navbar-header" style={{height: "215px",color:"blue"}}>
                <Container fluid className=" iq-container">
                    <Row>
                        <Col md="12">
                            <div className="d-flex justify-content-between flex-wrap">
                                    <h1>Hello Admin!</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
