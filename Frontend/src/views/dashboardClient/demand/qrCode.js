    import React from "react";
    import { Container, Row, Col, Card } from "react-bootstrap";

    const QRData = ({ formData }) => {
    return (
        <Container>
        <Row>
            <Col>
            <Card>
                <Card.Body>
                <h4>Client Information</h4>
                <p>Full Name: {formData.clientFullName}</p>
                <p>Phone: {formData.clientPhone}</p>
                <p>Address: {formData.address}</p>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card>
                <Card.Body>
                <h4>Agent Information</h4>
                <p>Full Name: {formData.agentFullName}</p>
                <p>Phone: {formData.agentPhone}</p>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
            <Col>
            <Card>
                <Card.Body>
                <h4>Command Description</h4>
                <p>{formData.commandDescription}</p>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
    };

    export default QRData;
