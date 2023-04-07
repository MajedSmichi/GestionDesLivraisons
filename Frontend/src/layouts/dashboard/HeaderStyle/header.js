import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomToggle from "../../../components/dropdowns";
import {MdNotifications} from "react-icons/md"
import {MdEmail} from 'react-icons/md'


//img

import shapes1 from "../../../assets/images/shapes/01.png";

import avatars1 from "../../../assets/images/avatars/01.png";
import { adminContext } from "../../../App";
import { apiUrl } from "../../../Constants";
import axios from "axios";
import moment from "moment";






const Header = () => {

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };
  const navigate = useNavigate();
  const { adminData, setAdminData } = useContext(adminContext);
  const [notifications,setNotifications]=useState([])
  const [newNotifcation, setnewNotifcation] = useState(false);
  const getUserData = async () => {
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getAdmin`,{ headers:{
        Authorization: token
      }});
      
      setAdminData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getNotifications=async()=>{
   try {
    const token=localStorage.getItem("token");
    const response=await axios.get(`${apiUrl}/users/getNotification`,{
      headers:{Authorization:token}
    })
    setNotifications(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  useEffect(() => {
    getUserData();
    getNotifications();
  }, []);

  useEffect(() => {
    getUserData();
    getNotifications();
  }, []);

  useEffect(() => {
   const isNewNot = notifications.some(({status})=>status==="new");
   setnewNotifcation(isNewNot);
  }, [notifications]);

 

  const updateNotifications = async() => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${apiUrl}/users/updateNotification`, null, {headers:{"Authorization": token}})
    } catch (error) {
      console.log(error)
    }
  }
  const changeNotesStatus = () => {
    updateNotifications();
    setnewNotifcation(false)
  }

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/ClientAgent");
  };

 

  return (
    <>
      <Navbar expand="lg" variant="light" className="nav iq-navbar" >
        <Container fluid className="navbar-inner">
          <Navbar.Collapse style={{ display: "flex" }}>
            <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0" style={{marginTop:"-20px"}}>
              <Dropdown as="li" className="sidebar-toggle" onClick={minisidebar}>
                <i className="icon">
                  <svg width="20px" height="20px" viewBox="0 5 18 24">
                    <path
                      fill="currentColor"
                      d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                    />
                  </svg>
                </i>
              </Dropdown>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  href="#"
                  variant=" nav-link"
                  id="notification-drop"
                >
                  <MdNotifications size={25} color={newNotifcation? 'red':'#ccc'} onClick={changeNotesStatus}/>
                  <span className="bg-danger dots"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="p-0 sub-drop dropdown-menu-end"
                  aria-labelledby="notification-drop"
                >
                  <div className="m-0 shadow-none card">
                    <div className="py-3 card-header d-flex justify-content-between bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">All Notifications</h5>
                      </div>
                    </div>
                    <div className="p-0 card-body" style={{ height: '250px', overflowY: 'scroll'}}>
                          {notifications.map(({_id, data,createdAt})=>(
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <img
                            className="p-1 avatar-40 rounded-pill bg-soft-primary"
                            src={avatars1}
                            alt=""
                          />
                          <div className="ms-3 w-100">
                            
                              <h6 key={_id} className="mb-0 ">{data}</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="float-right font-size-12">
                               {moment(createdAt).format('DD/MM/YYYY')}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                            ))}
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  href="#"
                  variant="nav-link"
                  id="mail-drop"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
               <MdEmail size={25} />
                  <span className="bg-primary count-mail"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="p-0 sub-drop dropdown-menu-end"
                  aria-labelledby="mail-drop"
                >
                  <div className="m-0 shadow-none card">
                    <div className="py-3 card-header d-flex justify-content-between bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">All Message</h5>
                      </div>
                    </div>
                    <div className="p-0 card-body ">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes1}
                              alt=""
                            />
                          </div>
                          <div className=" w-100 ms-3">
                            <h6 className="mb-0 ">Bni Emma Watson</h6>
                            <small className="float-left font-size-12">
                              13 Jun
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  variant=" nav-link py-0 d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <img
                    src={`${apiUrl}/` + adminData.photoUrl}
                    alt="User-Profile"
                    className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"
                  />

                  <div className="caption ms-3 d-none d-md-block ">
                    <h6 className="mb-0 caption-title">{adminData.firstName} {adminData.lastName}</h6>
                    <p className="mb-0 caption-sub-title">
                      Delivery Administrator
                    </p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <Dropdown.Item href="/dashboard/user-profileAdmin">Profile</Dropdown.Item>
                  
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
