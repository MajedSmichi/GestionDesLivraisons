import React from 'react'
import Card from '../../../components/Card'
import {Row,Col} from 'react-bootstrap'


const GoogleAgent = () => {
    return (
        <div>
            <Row>
                <Col lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Basic</h4>
                            </div>
                        </Card.Header>
                        <div className="card-body">
                            <p>Creating basic google map</p>
                            <iframe className="w-100" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin" height="500" allowFullScreen=""></iframe>
                        </div>
                    </Card>
                </Col>
            </Row>      
        </div>
    )
}

export default GoogleAgent
