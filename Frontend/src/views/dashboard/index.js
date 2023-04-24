import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { bindActionCreators } from "redux";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";
import CountUp from "react-countup";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.scss";
import { CgProfile } from "react-icons/cg";
import {SiGooglemaps} from "react-icons/si"
import {CiDeliveryTruck} from "react-icons/ci"
import {ImManWoman} from "react-icons/im"
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
import Circularprogressbar from "../../components/circularprogressbar";
import { Link } from "react-router-dom";

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

const Index = (props) => {
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
  const [userNumbers, setUserNumbers] = useState({
    totalClients: "",
    totalAgents: "",
  });

  const [demandsNumbers, setDemandsNumbers] = useState({
    demandsAccepted: "",
    demandsRejected: "",
  });

  const getUsersNumbers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/calculateUsers`, {
        headers: {
          Authorization: token,
        },
      });

      setUserNumbers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDemandsNumbers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/calculateDemands`, {
        headers: {
          Authorization: token,
        },
      });
      setDemandsNumbers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersNumbers();
    getDemandsNumbers();
  }, []);

  //chart2
  const chart2 = {
    options: {
      colors: [props.colorprimarymode, props.cololrinfomode],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Apples", "Oranges"],
    },
    series: [userNumbers.totalClients, userNumbers.totalAgents],
  };

  return (
    <>
      <Row>
        <Col  >
          <Row >
          <Col md={{ span: 8, offset: 2 } }  lg="10">
            <div className="overflow-hidden d-slider1 ">
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={10}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                  1500: { slidesPerView: 5 },
                  1920: { slidesPerView: 6 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 },
                }}
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <SwiperSlide className="card card-slide" style={{ width:400, height: 150 }}>
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.colorprimarymode}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={demandsNumbers.demandsAccepted}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total demands accepted</p>
                        <h4 className="counter">
                          <CountUp
                            start={0}
                            end={demandsNumbers.demandsAccepted}
                            duration={3}
                          />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide" style={{ width: 370, height: 150 }}>
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.cololrinfomode}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={demandsNumbers.demandsRejected}
                        id="circle-progress-02"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total demands refused</p>
                        <h4 className="counter">
                          <CountUp
                            start={0}
                            end={demandsNumbers.demandsRejected}
                            duration={3}
                          />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
          
              </Swiper>
            </div>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}  lg="8">
          <Row>
            <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="900">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Users</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="flex-wrap d-flex align-items-center justify-content-between">
                    <Chart
                      className="col-md-8 col-lg-8"
                      options={chart2.options}
                      series={chart2.series}
                      type="radialBar"
                      height="250"
                    />
                    <div className="d-grid gap col-md-4 col-lg-4">
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#3a57e8"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#3a57e8"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-secondary">Client</span>
                          <h6>{userNumbers.totalClients}</h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#4bc7d2"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#4bc7d2"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-secondary">Agent</span>
                          <h6>{userNumbers.totalAgents}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <Link to="user-profileAdmin">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <CgProfile size={25} style={{ marginRight: "10px" }} />
                  Profile
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="google">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <SiGooglemaps size={25} style={{ marginRight: "10px" }} />
                  Maps
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
          <Col>
              <Link to="user-listAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <CiDeliveryTruck size={25} style={{ marginRight: "10px" }} />
                  Agent List
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="addAgent">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <CiDeliveryTruck size={25} style={{ marginRight: "10px" }} />
                  Add Agent
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
          <Col>
              <Link to="user-list">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ImManWoman size={25} style={{ marginRight: "10px" }} />
                  Customer List
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="user-add">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ImManWoman size={25} style={{ marginRight: "10px" }} />
                  Add Customer
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
          <Col>
              <Link to="calendar">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <AiFillCalendar size={25} style={{ marginRight: "10px" }} />
                  Calender
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="">
                <Card
                  style={{
                    backgroundColor: "#b6e1e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <VscFeedback size={25} style={{ marginRight: "10px" }} />
                  FeedBack
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
