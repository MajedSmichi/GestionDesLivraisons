import React, { useContext, useEffect} from "react";
import { Row, Col, Card } from "react-bootstrap";
import SwiperCore, { Navigation } from "swiper";
import { bindActionCreators } from "redux";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.scss";
import { CgProfile } from "react-icons/cg";
import {SiGooglemaps} from "react-icons/si"
import {VscFeedback} from "react-icons/vsc"
import {AiFillCalendar} from "react-icons/ai"


// store
import {
  NavbarstyleAction,
  getDirMode,
  getcustomizerMode,
  getcustomizerprimaryMode,
  getcustomizerinfoMode,
  SchemeDirAction,
  ColorCustomizerAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
} from "../../store/setting/setting";
import { connect } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../Constants";
import { Link } from "react-router-dom";
import { agentContext } from "../../App";

// install Swiper modules
SwiperCore.use([Navigation]);

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
};
const mapDispatchToProps = (dispatch) => ({
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
  ),
});

const IndexAgent = (props) => {
  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });


  const { agentData, setAgentData } = useContext(agentContext);
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getAgent`, {
        headers: {
          Authorization: token,
        },
      });
      setAgentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    console.log(agentData.permission);
  }, []);


  return (
    <>
      <Row>
   
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <Link to="user-profileAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <CgProfile size={35} style={{ marginRight: "10px" }} />
                  Profile
                </Card>
              </Link>
            </Col>
            {agentData.permission === "Yes" ?(
            <Col>
              <Link to="mapAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <SiGooglemaps size={35} style={{ marginRight: "10px" }} />
                  Maps
                </Card>
              </Link>
            </Col>):(
               <Col>
               <Link to="">
                 <Card
                   style={{
                     backgroundColor: "#b6e1e0",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     cursor: "pointer",
                     boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                     height:"150px"
                   }}
                 >
                   <SiGooglemaps size={35} style={{ marginRight: "10px" }} />
                   Maps
                 </Card>
               </Link>
             </Col>
            )}
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
          <Col>
              <Link to="calendarAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <AiFillCalendar size={35} style={{ marginRight: "10px" }} />
                  Calender
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="FeedBackList">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <VscFeedback size={35} style={{ marginRight: "10px" }} />
                  FeedBack
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
          {agentData.permission === "Yes" ?(
          <Col>
              <Link to="demandAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <AiFillCalendar size={35} style={{ marginRight: "10px" }} />
                  Demand
                </Card>
              </Link>
            </Col>):( <Col>
              <Link to="">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height:"150px"
                  }}
                >
                  <AiFillCalendar size={35} style={{ marginRight: "10px" }} />
                  Demand
                </Card>
              </Link>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAgent);
