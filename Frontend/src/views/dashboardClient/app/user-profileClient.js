import React, { useContext, useEffect, useState } from "react";

import { Row, Col, Image, Nav, Tab, Button } from "react-bootstrap";
import Card from "../../../components/Card";

// img
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import avatars11 from "../../../assets/images/avatars/01.png";
import axios from "axios";
import { apiUrl } from "../../../Constants";
import { customerContext } from "../../../App";
import moment from "moment";

const UserProfileClient = () => {
  const [editData, setEditData] = useState(false);
  const { userData, setUserData } = useContext(customerContext);
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getCustomer`,{
        headers:{
          Authorization: token
        }
      });
    
    
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateData = async () => {
    setEditData(false);

    try {
      const token = localStorage.getItem("token");
      const body = new FormData();
      body.append("firstName", userData.firstName);
      body.append("lastName", userData.lastName);
      body.append("email", userData.email);
      body.append("phone", userData.phone);
      body.append("whatsApp", userData.whatsApp);
      if (userData.photo?.name) {
        body.append("photo", userData.photo, userData.photo.name);
      }
      body.append("adresse", userData.adresse);
      body.append("dateOfBirth", userData.dateOfBirth);
      await axios.put(`${apiUrl}/users/update`, body,{
        headers:{
          Authorization: token
        }
      });
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (userPassword.newPassword !== userPassword.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await axios.put(`${apiUrl}/users/updatePassword`, {
        newPassword: userPassword.newPassword,
        confirmPassword: userPassword.confirmPassword,
      },{
        headers:{
          Authorization: token
        }
      });
      setSuccessMessage("Password updated successfully")
      setUserPassword({ newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setSuccessMessage("")
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const photo = `${apiUrl}/` + userData.photoUrl;
  return (
    <>
      <Tab.Container defaultActiveKey="second">
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
                      <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <Tab.Content className="profile-content">
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
                        {!userData.photoUrl ? (
                          <Image
                            className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                            src={avatars11}
                            alt="profile-pic"
                          />
                        ) : (
                          <Image
                            className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                            src={photo}
                            alt="profile-pic"
                          />
                        )}
                      </div>
                      <div className="mt-3">
                        <h3 className="d-inline-block">
                          {userData.firstName} {userData.lastName}{" "}
                        </h3>
                        <p className="d-inline-block pl-3">
                          {" "}
                          - Delivery Client
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
                      {!editData ? (
                        <div className="mb-3">
                          <h5 className="label label-default">First Name:</h5>
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
                          <p>{moment(userData.dateOfBirth).format('DD/MM/YYYY')}</p>
                          <Button
                            className="btn-inner "
                            onClick={() => setEditData(true)}
                          >
                            Edit
                            <AiOutlineEdit />
                          </Button>
                        </div>
                      ) : (
                        <form
                          action="/uploads"
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <div className="input mb-3">
                            <h5 className="label label-default">
                              Profile Photo:
                            </h5>
                            <input
                              className="file-upload"
                              type="file"
                              accept="image/*"
                              id="photo"
                              name="photo"
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  photo: e.target.files[0],
                                })
                              }
                            />
                            <br />
                            <br />
                            <h5 className="label label-default">First Name:</h5>
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
                              <span className="label label-default">
                                Email:
                              </span>
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
                              <span className="label label-default">
                                Phone:
                              </span>
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
                              value={userData.whatsApp}
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
                        </form>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Security</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <h5>
                      <span className="label label-default">New password:</span>
                    </h5>
                    <input
                      className="form-control"
                      type="password"
                      value={userPassword.newPassword}
                      onChange={(e) =>
                        setUserPassword({
                          ...userPassword,
                          newPassword: e.target.value,
                        })
                      }
                      onFocus={() => setError("")}
                    />
                    <br />
                    <br />
                    <h5>
                      <span className="label label-default">
                        Confirm new password:
                      </span>
                    </h5>
                    <input
                      className="form-control"
                      type="password"
                      value={userPassword.confirmPassword}
                      onChange={(e) =>
                        setUserPassword({
                          ...userPassword,
                          confirmPassword: e.target.value,
                        })
                      }
                      onFocus={() => setError("")}
                    />
                    <br />
                    <br />
                    {successMessage && (
                      <div
                        className="alert alert-success text-center"
                        role="alert"
                      >
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <p style={{ color: "red", textAlign: "center" }}>
                        {error}
                      </p>
                    )}
                    <Button onClick={changePassword} className=" btn-inner">
                      Save
                      <FiSave />
                    </Button>
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
