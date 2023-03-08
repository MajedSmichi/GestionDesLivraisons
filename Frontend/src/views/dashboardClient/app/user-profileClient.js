import React, { useEffect, useState } from "react";

import { Row, Col, Image, Nav, Tab, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link } from "react-router-dom";
// img
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import avatars11 from "../../../assets/images/avatars/01.png";
import axios from "axios";
import { apiUrl } from "../../../Constants";



const UserProfileClient = () => {
  
  const [editData, setEditData] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsApp: "",
    adresse: "",
    // joindate: new Date().toISOString()
    dateOfBirth:"",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(`${apiUrl}/users/user/${user}`);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const updateData = async () => {
    setEditData(false);

    try {
      const user = localStorage.getItem("user");
      await axios.put(`${apiUrl}/users/update/${user}`, userData);
      const response = await axios.get(`${apiUrl}/users/user/${user}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-between ">
                  <Nav
                    as="ul"
                    className="d-flex nav-pills mb-0 p-center profile-tab"
                    data-toggle="slider-tab"
                    id="profile-pills-tab"
                    role="tablist"
                  >
                    <Nav.Item as="li">
                      <Nav.Link eventKey="first">Activity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-activity">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Activity</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                      <ul className="list-inline p-0 m-0">
                        <li>
                          <div className="timeline-dots timeline-dot1 border-primary p-primary"></div>
                          <h6 className="float-left mb-1">Client Login</h6>
                          <small className="float-right mt-1">
                            24 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-success p-success"></div>
                          <h6 className="float-left mb-1">
                            Scheduled Maintenance
                          </h6>
                          <small className="float-right mt-1">
                            23 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-danger p-danger"></div>
                          <h6 className="float-left mb-1">Dev Meetup</h6>
                          <small className="float-right mt-1">
                            20 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans{" "}
                              <Link to="#">gummi bears</Link>gummi bears jelly
                              lollipop apple
                            </p>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-primary p-primary"></div>
                          <h6 className="float-left mb-1">Client Call</h6>
                          <small className="float-right mt-1">
                            19 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-warning p-warning"></div>
                          <h6 className="float-left mb-1">Mega event</h6>
                          <small className="float-right mt-1">
                            15 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second" id="profile-profile">
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Profile</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="p-center">
                      <div className="user-profile">
                        <Image
                          className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                          src={avatars11}
                          alt="profile-pic"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="d-inline-block">
                          {userData.firstName} {userData.lastName}{" "}
                        </h3>
                        <p className="d-inline-block pl-3">
                          {" "}
                          - Delivery Client
                        </p>
                        <p className="mb-0">
                          Lorem Ipsum is simply dummy p of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy p ever since the 1500s
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">About User</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <h5 className="label label-default">First Name:</h5>
                      {!editData ? (
                        <div className="mb-3">
                          <p>{userData.firstName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Last Name:
                            </span>
                          </h5>
                          <p>{userData.lastName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Email:</span>
                          </h5>
                          <p>{userData.email}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Phone:</span>
                          </h5>
                          <p>{userData.phone}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              WhatsAppPhone:
                            </span>
                          </h5>
                          <p>{userData.whatsApp}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Adresse:
                            </span>
                          </h5>
                          <p>{userData.adresse}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                            Date of birth:
                            </span>
                          </h5>
                          <p>{userData.dateOfBirth}</p>
                          <Button
                            className="btn-inner "
                            onClick={() => setEditData(true)}
                          >
                            Edit
                            <AiOutlineEdit />
                          </Button>
                        </div>
                      ) : (
                        <div className="input mb-3">
                          <input
                            className="form-control"
                            value={userData.firstName}
                            required
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Last Name:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            value={userData.lastName}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                lastName: e.target.value,
                              })
                            }
                          />
                          <br />
                          <h5>
                            <span className="label label-default">Email:</span>
                          </h5>
                          <input
                            className="form-control"
                            value={userData.email}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              })
                            }
                          />
                          <br />
                          <h5>
                            <span className="label label-default">Phone:</span>
                          </h5>
                          <input
                            className="form-control"
                            value={userData.phone}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                phone: e.target.value,
                              })
                            }
                          />
                          <br />
                          <h5>
                            <span className="label label-default">
                              WhatsAppPhone:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            value={userData.whatsApp || ""}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                whatsApp: e.target.value,
                              })
                            }
                          />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Adresse:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            value={userData.adresse}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                adresse: e.target.value,
                              })
                            }
                          />
                          <br />
                          
                          <h5>
                            <span className="label label-default">
                              Date of birth :
                            </span>
                          </h5>
                            <input
                              type="date"
                              min="1960-01-01"
                              max="2010-12-31"
                              className="form-control"
                              value={userData.dateOfBirth}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  dateOfBirth: e.target.value,
                                })
                              }
                            />
                          <br />
                          <br />
                          <Button onClick={updateData} className=" btn-inner">
                            Save
                            <FiSave />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default UserProfileClient;
