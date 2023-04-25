import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const SubHeaderCustomer = (props) => {
  return (
    <>
      <div
        className="iq-navbar-header"
        style={{ height: "215px", color: "blue" }}
      >
        <Container fluid className=" iq-container">
          <Row>
            <Col md="12">
              <div className="d-flex justify-content-between flex-wrap">
                <h1>Welcome to delivery</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SubHeaderCustomer;
