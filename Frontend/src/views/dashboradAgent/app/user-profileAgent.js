import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import { Row, Col, Image, Nav, Tab, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link } from "react-router-dom";
// img
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import avatars11 from "../../../assets/images/avatars/01.png";
import axios from "axios";
import { apiUrl } from "../../../Constants";
import { agentContext } from "../../../App";

const UserProfileAgent = () => {
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [editData, setEditData] = useState(false);
  const { agentData, setAgentData } = useContext(agentContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
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
  }, []);

  const updateData = async () => {
    setEditData(false);

    try {
      const token = localStorage.getItem("token");
      const body = new FormData();
      body.append("firstName", agentData.firstName);
      body.append("lastName", agentData.lastName);
      body.append("email", agentData.email);
      body.append("phone", agentData.phone);
      body.append("whatsApp", agentData.whatsApp);
      if (agentData.photo?.name) {
        body.append("photo", agentData.photo, agentData.photo.name);
      }
      if (agentData.cardPhoto1?.name) {
        body.append(
          "cardPhoto1",
          agentData.cardPhoto1,
          agentData.cardPhoto1.name
        );
      }
      if (agentData.cardPhoto2?.name) {
        body.append(
          "cardPhoto2",
          agentData.cardPhoto2,
          agentData.cardPhoto2.name
        );
      }
      body.append("adresse", agentData.adresse);
      body.append("dateOfBirth", agentData.dateOfBirth);
      body.append("idCard", agentData.idCard);
      body.append("vehicule", agentData.vehicule);
      await axios.put(`${apiUrl}/users/updateAgentt`, body, {
        headers: {
          Authorization: token,
        },
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

      await axios.put(
        `${apiUrl}/users/updatePasswordAgent`,
        {
          newPassword: userPassword.newPassword,
          confirmPassword: userPassword.confirmPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSuccessMessage("Password updated successfully");
      setTimeout(() => {
        setUserPassword({ newPassword: "", confirmPassword: "" });
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const photo = `${apiUrl}/` + agentData.photoUrl;
  const cardPhoto1 = `${apiUrl}/` + agentData.cardPhoto1;
  const cardPhoto2 = `${apiUrl}/` + agentData.cardPhoto2;



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
                    className="d-flex nav-pills mb-0 p-center profile-tab mb-3"
                    data-toggle="slider-tab"
                    id="profile-pills-tab"
                    role="tablist"
                  >
                    <Nav.Item as="li">
                      <Nav.Link eventKey="first">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <Tab.Content className="profile-content">
              
              <Tab.Pane eventKey="first" id="profile-profile">
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Profile</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="p-center">
                      <div className="user-profile">
                        {!agentData.photoUrl ? (
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
                          {agentData.firstName} {agentData.lastName}{" "}
                        </h3>
                        <p className="d-inline-block pl-3"> - Delivery Agent</p>
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
                          <p>{agentData.firstName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Last Name:
                            </span>
                          </h5>
                          <p>{agentData.lastName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Email:</span>
                          </h5>
                          <p>{agentData.email}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Phone:</span>
                          </h5>
                          <p>{agentData.phone}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Id Card:
                            </span>
                          </h5>
                          <p>{agentData.idCard}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              CardPhoto1:
                            </span>
                          </h5>
                          <p>
                            {!agentData.cardPhoto1 ? (
                              <Image
                                className="img-fluid w-25 p-3"
                                src={avatars11}
                                alt="profile-pic"
                              />
                            ) : (
                              <Image
                                className="img-fluid w-25 p-3"
                                src={cardPhoto1}
                                alt="profile-pic"
                              />
                            )}
                          </p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              CardPhoto2 :
                            </span>
                          </h5>
                          <p>
                            {!agentData.cardPhoto2 ? (
                              <Image
                                className=" img-fluid w-25 p-3"
                                src={avatars11}
                                alt="profile-pic"
                              />
                            ) : (
                              <Image
                                className="img-fluid w-25 p-3"
                                src={cardPhoto2}
                                alt="profile-pic"
                              />
                            )}
                          </p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              WhatsAppPhone:
                            </span>
                          </h5>
                          <p>{agentData.whatsApp}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Vehicule:
                            </span>
                          </h5>
                          <p>{agentData.vehicule}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Adresse:
                            </span>
                          </h5>
                          <p>{agentData.adresse}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Date of birth:
                            </span>
                          </h5>
                          <p>{moment(agentData.dateOfBirth).format('DD/MM/YYYY')}</p>
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
                                setAgentData({
                                  ...agentData,
                                  photo: e.target.files[0],
                                })
                              }
                            />
                            <br />
                            <br />
                            <h5 className="label label-default">First Name:</h5>
                            <input
                              className="form-control"
                              value={agentData.firstName}
                              required
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
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
                              value={agentData.lastName}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
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
                              value={agentData.email}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
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
                              value={agentData.phone}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  phone: e.target.value,
                                })
                              }
                            />
                            <br />
                            <h5>
                              <span className="label label-default">
                                Id Card:
                              </span>
                            </h5>
                            <input
                              className="form-control"
                              value={agentData.idCard}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  idCard: e.target.value,
                                })
                              }
                            />
                            <br />
                            <h5>
                              <span className="label label-default">
                                Id Card1:
                              </span>
                            </h5>
                            <input
                              className="file-upload"
                              type="file"
                              accept="image/*"
                              id="cardPhoto1"
                              name="cardPhoto1"
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  cardPhoto1: e.target.files[0],
                                })
                              }
                            />
                            <br />
                            <br />
                            <h5>
                              <span className="label label-default">
                                Id Card2:
                              </span>
                            </h5>
                            <input
                              className="file-upload"
                              type="file"
                              accept="image/*"
                              id="cardPhoto2"
                              name="cardPhoto2"
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  cardPhoto2: e.target.files[0],
                                })
                              }
                            />
                            <br />
                            <br />
                            <h5>
                              <span className="label label-default">
                                WhatsAppPhone:
                              </span>
                            </h5>
                            <input
                              className="form-control"
                              value={agentData.whatsApp}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  whatsApp: e.target.value,
                                })
                              }
                            />
                            <br />
                            <h5>
                              <span className="label label-default">
                                Vehicule:
                              </span>
                            </h5>
                            <input
                              className="form-control"
                              value={agentData.vehicule}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
                                  vehicule: e.target.value,
                                })
                              }
                            />setAgentData
                            <br />
                            <h5>
                              <span className="label label-default">
                                Adresse:
                              </span>
                            </h5>
                            <input
                              className="form-control"
                              value={agentData.adresse}
                              onChange={(e) =>
                                setAgentData({
                                  ...agentData,
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
                              //value={agentContext.dateOfBirth}
                              value={agentData.dateOfBirth}
                              onChange={(e) =>
                                {console.log({type:typeof e.target.value})
                                setAgentData({
                                  ...agentData,
                                  dateOfBirth: e.target.value,
                                })}
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

export default UserProfileAgent;
