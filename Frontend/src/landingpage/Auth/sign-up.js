import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import axios from "axios";
import validateEmail from "../../components/helpers";
import Header from "../header/Header";
// img
import auth1 from "./deliv.jpg";
import { apiUrl } from "../../Constants";

const SignUp = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const server = `${apiUrl}/users/signup`;
  const onRegister = async (e) => {
    e.preventDefault();

    if (
      data.email === "" ||
      data.password === "" ||
      data.firstName === "" ||
      data.lastName === "" ||
      data.password === "" ||
      data.phone === "" ||
      confirmPassword === ""
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
      setTimeout(() => {
        navigate(`/SignIn/${role}`);
      }, 2000);
    } catch (e) {
      setError(e.response.data.error);
    }
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <Header />
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white  ">
          <div className="col-sm-4 d-md-block d-none bg-primary p-0 mt-n1 vh-90 overflow-hidden">
            <Image
              src={auth1}
              className="Image-fluid gradient-main "
              alt="images"
            />
          </div>
          <Col md="8">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                  <Card.Body>
                    <h2 className="mb-2 text-center">Sign Up</h2>
                    <p className="text-center">Create your Delivery account.</p>
                    {successMessage && (
                      <div
                        className="alert alert-success text-center"
                        role="alert"
                      >
                        {successMessage}
                      </div>
                    )}
                    <Form>
                      <Row>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="firstName" className="">
                              Fisrt Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className=""
                              id="fisrtName"
                              value={data.firstName}
                              onChange={(e) =>
                                setData({ ...data, firstName: e.target.value })
                              }
                              onFocus={() => setError("")}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="lastName" className="">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className=""
                              id="lastName"
                              value={data.lastName}
                              onChange={(e) =>
                                setData({ ...data, lastName: e.target.value })
                              }
                              onFocus={() => setError("")}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email" className="">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              className=""
                              id="email"
                              value={data.email}
                              onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                              }
                              onFocus={() => setError("")}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="phone" className="">
                              Phone 
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className=""
                              id="phone"
                              value={data.phone}
                              onChange={(e) =>
                                setData({ ...data, phone: e.target.value })
                              }
                              onFocus={() => setError("")}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password" className="">
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className=""
                              id="password"
                              value={data.password}
                              onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                              }
                              onFocus={() => setError("")}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="confirm-password" className="">
                              Confirm Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className=""
                              id="confirm-password"
                              value={confirmPassword}
                              onFocus={() => setError("")}
                              onChange={(e) =>
                                setconfirmPassword(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                        {error && (
                          <p style={{ color: "red", textAlign: "center" }}>
                            {error}
                          </p>
                        )}
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button
                          onClick={onRegister}
                          type="button"
                          variant="primary"
                        >
                          Sign Up
                        </Button>
                      </div>
                      <p className="text-center my-3">
                        or sign in with other accounts?
                      </p>
                      <p className="mt-3 text-center">
                        Already have an Account{" "}
                        <Link to={`/SignIn/${role}`} className="text-underline">
                          Sign In
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default SignUp;
