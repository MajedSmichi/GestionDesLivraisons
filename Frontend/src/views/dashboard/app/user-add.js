import React, { useState } from "react";
import { Row, Col,Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate } from "react-router-dom";
// img

import validateEmail from "../../../components/helpers";
import axios from "axios";
import { apiUrl } from "../../../Constants";
const token = localStorage.getItem('token')
const UserAdd = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    whatsApp: "",
    adresse: "",
    dateOfBirth: "",
    photo:""
  });
  const role = "1";
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const server = `${apiUrl}/users/addCustomer`
  const onRegister = async (e) => {
    e.preventDefault();
    

    if (
      data.email === "" ||
      data.password === "" ||
      data.firstName === "" ||
      data.lastName === "" ||
      data.password === "" ||
      data.phone === "" ||
      data.confirmPassword === "" ||
      data.adresse === "" ||
      data.whatsApp === "" ||
      data.dateOfBirth === "" ||
      data.photo === ""
    ) {
      setError("Please enter your data!");
      return;
    }

    if (!validateEmail(data.email)) {
      setError("Email invalide");
      return;
    }

    if (data.password !== confirmPassword) {
      setError("Passwords not same");
      return;
    }

    try {
      const body = new FormData();
      body.append("firstName",data.firstName);
      body.append("lastName",data.lastName);
      body.append("email", data.email);
      body.append("phone",data.phone);
      body.append("whatsApp",data.whatsApp)
      body.append("photo", data.photo, data.photo.name);
      body.append("adresse",data.adresse);
      body.append("date of birth",data.dateOfBirth);
      body.append("password",data.password);
      body.append("role",role);
      
      await axios.post(server, body,{
        headers: {
          Authorization: token,
        },
      });
      console.log(data)
      setSuccessMessage("User created");
      setTimeout(() => {
        Navigate("/dashboard/user-list");
      }, 2000);
    } catch (e) {
      console.log(e)
      setError(e.response.data.error);
      
    }
  };
  return (
    <>
      <div>
        <Row>
        <Col md={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h3 className="card-title">Add New User:</h3>
                  <h4 className="card-title">New User Information:</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form action="/uploads" method="POST" encType="multipart/form-data">
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="photo">User Photo:</Form.Label>
                        <div className="profile-img-edit position-relative">
                          <Form.Control
                            className="file-upload" 
                            type="file"
                            accept="image/*"
                            id="photo"
                            name="photo"
                            onChange={(e) =>
                              
                              setData({ ...data, photo: e.target.files[0]} )
                              
                            }
                            
                            onFocus={() => setError("")}
                          />
                        </div>
                        <div className="img-extension mt-3">
                          <div className="d-inline-block align-items-center">
                            <span>Only</span> <Link to="#">.jpg</Link>{" "}
                            <Link to="#">.png</Link> <Link to="#">.jpeg</Link>{" "}
                            <span>allowed</span>
                          </div>
                        </div>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="fname">First Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="fname"
                          placeholder="First Name"
                          value={data.firstName}
                          onChange={(e) =>
                            setData({ ...data, firstName: e.target.value })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="lname">Last Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="lname"
                          placeholder="Last Name"
                          value={data.lastName}
                          onChange={(e) =>
                            setData({ ...data, lastName: e.target.value })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="add1">Address </Form.Label>
                        <Form.Control
                          type="text"
                          id="add1"
                          placeholder="Address"
                          value={data.adresse}
                          onChange={(e) =>
                            setData({ ...data, adresse: e.target.value })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="mobno">Mobile Number:</Form.Label>
                        <Form.Control
                          type="text"
                          id="mobno"
                          placeholder="Mobile Number"
                          value={data.phone}
                          onChange={(e) =>
                            setData({ ...data, phone: e.target.value })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="altconno">
                          WhatsApp Contact:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="altconno"
                          placeholder="WhatsApp Contact"
                          value={data.whatsApp}
                          onChange={(e) =>
                            setData({
                              ...data,
                              whatsApp: e.target.value,
                            })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="email">Email:</Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="date">Date Of Birth:</Form.Label>
                        <Form.Control
                          type="date"
                          id="date"
                          min="1960-01-01"
                          max="2010-12-31"
                          value={data.dateOfBirth}
                          onChange={(e) =>
                            setData({
                              ...data,
                              dateOfBirth: e.target.value,
                            })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                    </div>
                    <hr />
                    <h5 className="mb-3">Security</h5>
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="pass">Password:</Form.Label>
                        <Form.Control
                          type="password"
                          id="pass"
                          placeholder="Password"
                          value={data.password}
                          onChange={(e) =>
                            setData({
                              ...data,
                              password: e.target.value,
                            })
                          }
                          onFocus={() => setError("")}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="rpass">
                          Repeat Password:
                        </Form.Label>
                        <Form.Control
                          type="password"
                          id="rpass"
                          placeholder="Repeat Password "
                          value={confirmPassword}
                          onFocus={() => setError("")}
                          onChange={(e) => setconfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                    </div>
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
                    <Button
                      type="button"
                      variant="btn btn-primary"
                      onClick={onRegister}
                    >
                      Add New User
                    </Button>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserAdd;
