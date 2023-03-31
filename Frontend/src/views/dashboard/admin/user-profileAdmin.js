import React, {useContext, useEffect, useState } from "react";

import { Row, Col, Image, Nav, Tab, Button} from "react-bootstrap";
import Card from "../../../components/Card";


// img
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import avatars11 from "../../../assets/images/avatars/01.png";
import axios from "axios";
import { apiUrl } from "../../../Constants";
import { adminContext } from "../../../App";



const UserProfileAdmin = () => {
  
  const [editData, setEditData] = useState(false);
  const { adminData, setAdminData } = useContext(adminContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${apiUrl}/users/getAdmin`,
       { headers:{
          Authorization: token
        }});
      setAdminData(response.data);
      
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
      body.append("firstName",adminData.firstName);
      body.append("lastName",adminData.lastName);
      body.append("email", adminData.email);
      body.append("phone",adminData.phone);
      body.append("whatsApp",adminData.whatsApp);
      if(adminData.photo?.name) {
        body.append("photo", adminData.photo, adminData.photo.name);
      }
   
      body.append("dateOfBirth",adminData.dateOfBirth);
      
      await axios.put(`${apiUrl}/users/updateAdmin`, body,{
        headers:{
          Authorization: token
        }});
      getUserData()
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

      await axios.put(`${apiUrl}/users/updatePasswordAdmin`, {
        newPassword: userPassword.newPassword,
        confirmPassword: userPassword.confirmPassword,
      },{
        headers:{
          Authorization: token
        }});
      setUserPassword({ newPassword: "", confirmPassword: "" });
      setSuccessMessage("Password updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  const photo="http://localhost:5000/"+adminData.photoUrl;
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
                      { !adminData.photoUrl ? (<Image
                          className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                          src={avatars11}
                          
                          alt="profile-pic"
                        />)
                        :(<Image
                          className="theme-color-default-img  rounded-pill avatar-130 img-fluid"
                          src={photo}
                          
                          alt="profile-pic"/>)
                          }
                      </div>
                      <div className="mt-3">
                        <h3 className="d-inline-block">
                          {adminData.firstName} {adminData.lastName}{" "}
                        </h3>
                        <p className="d-inline-block pl-3">
                          {" "}
                          - Delivery Administrator
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
                          <p>{adminData.firstName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Last Name:
                            </span>
                          </h5>
                          <p>{adminData.lastName}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Email:</span>
                          </h5>
                          <p>{adminData.email}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">Phone:</span>
                          </h5>
                          <p>{adminData.phone}</p>
                          <br />
                          <br />
                          <h5>
                            <span className="label label-default">
                              WhatsAppPhone:
                            </span>
                          </h5>
                          <p>{adminData.whatsApp}</p>
                          <br />
                          <br />
                      
                          <h5>
                            <span className="label label-default">
                            Date of birth:
                            </span>
                          </h5>
                          <p>{adminData.dateOfBirth}</p>
                          <Button
                            className="btn-inner "
                            onClick={() => setEditData(true)}
                          >
                            Edit
                            <AiOutlineEdit />
                          </Button>
                        </div>
                      ) : (
                        <form action="/uploads" method="POST" encType="multipart/form-data">
                        <div className="input mb-3">
                           <h5 className="label label-default">Profile Photo:</h5>
                          <input
                             className="file-upload" 
                             type="file"
                             accept="image/*"
                             id="photo"
                             name="photo"
                             onChange={(e) =>
                              
                              setAdminData({ ...adminData, photo: e.target.files[0]} )
                              
                            }
                          />
                          <br />
                          <br />
                          <h5 className="label label-default">First Name:</h5>
                          <input
                            className="form-control"
                            value={adminData.firstName}
                            required
                            onChange={(e) =>
                              setAdminData({
                                ...adminData,
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
                            value={adminData.lastName}
                            onChange={(e) =>
                              setAdminData({
                                ...adminData,
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
                            value={adminData.email}
                            onChange={(e) =>
                              setAdminData({
                                ...adminData,
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
                            value={adminData.phone}
                            onChange={(e) =>
                              setAdminData({
                                ...adminData,
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
                            value={adminData.whatsApp}
                            onChange={(e) =>
                              setAdminData({
                                ...adminData,
                                whatsApp: e.target.value,
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
                              value={adminData.dateOfBirth}
                              onChange={(e) =>
                                setAdminData({
                                  ...adminData,
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

export default UserProfileAdmin;
