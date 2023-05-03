import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import topHeader from '../../../assets/images/dashboard/top-header.png'

const SubHeaderCustomer = (props) => {
  return  (
    <>
        <div className="iq-navbar-header" style={{height: "215px"}}>
            <Container fluid className=" iq-container">
                <Row>
                    <Col md="12">
                        <div className="d-flex justify-content-between flex-wrap">
                            <div>
                              <h1>Delivery Client</h1>
                                
                            </div>
                      
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* {{!-- rounded-bottom if not using animation --}} */}
            <div className="iq-header-img">
                <img src={topHeader} alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"/>
                
            </div>
        </div>
    </>
)
};

export default SubHeaderCustomer;
