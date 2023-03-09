import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate} from "react-router-dom";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import validateEmail from "../../../components/helpers";
import axios from "axios";

const UserAdd = () => {
   const Navigate=useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    whatsApp: "",
    adresse: "",
    dateOfBirth: "",
  });
  const role="1";
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const server = "http://localhost:5000/users/addCustomer";
  const onRegister = async (e) => {
    e.preventDefault();
    console.log(data);

    if (
      data.email === "" ||
      data.password === "" ||
      data.firstName === "" ||
      data.lastName === "" ||
      data.password === "" ||
      data.phone === "" ||
      data.confirmPassword === "" ||
      data.adresse === "" ||
      data.whatsApp===""||
      data.dateOfBirth===""
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
      await axios.post(server, { ...data, role });

      setSuccessMessage("User created");
      setTimeout(()=>{
         Navigate('/dashboard/user-list');
      },2000)
    } catch (e) {
      setError(e.response.data.error);
    }
  };
  return (
    <>
      <div>
        <Row>
          <Col xl="3" lg="4" className="">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add New User</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="form-group">
                    <div className="profile-img-edit position-relative">
                      <Image
                        className="theme-color-default-img  profile-pic rounded avatar-100 "
                        src={avatars1}
                        alt="profile-pic"
                      />
                      <div className="upload-icone bg-primary">
                        <svg
                          className="upload-button"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                          />
                        </svg>
                        <Form.Control
                          className="file-upload"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="img-extension mt-3">
                      <div className="d-inline-block align-items-center">
                        <span>Only</span> <Link to="#">.jpg</Link>{" "}
                        <Link to="#">.png</Link> <Link to="#">.jpeg</Link>{" "}
                        <span>allowed</span>
                      </div>
                    </div>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xl="9" lg="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">New User Information</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="fname">First Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="fname"
                          placeholder="First Name"
                          value={data.firstName}
                          onChange={(e) =>
                            setData({ ...data,firstName: e.target.value })
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
                            setData({ ...data,adresse: e.target.value })
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
                          onChange={(e) =>setData ({ ...data, phone: e.target.value })}
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
                          onChange={(e) => setData({
                            ...data,
                            whatsApp: e.target.value,
                          })}
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
                          onChange={(e) =>setData ({ ...data, email: e.target.value })}
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
                          onChange={(e) => setData({
                            ...data,
                            dateOfBirth: e.target.value,
                          })}
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
                          onChange={(e) => setData({
                            ...data,
                            password: e.target.value,
                          })}
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
                    <Button type="button" variant="btn btn-primary" onClick={onRegister}>
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
