import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import { Row, Col, Nav, Tab, Image, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { AiOutlineQrcode } from "react-icons/ai";
import { apiUrl } from "../../../Constants";
import axios from "axios";

const DemandClient = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [formData, setFormData] = useState({
    clientFullName: "",
    agentFullName: "",
    clientPhone: "",
    agentPhone: "",
    address: "",
    commandDescription: "",
  });
  const [agentData, setAgentData] = useState([]);


  const getAllAgent = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/users/getAllagent`, {
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
    getAllAgent();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({name, value})
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleChangeDataAgent=(e)=>{
    const  {value}  = e.target;
    const agentFullName = value.split(' ')[0]+value.split(' ')[1]
    setFormData((prevData) => ({ ...prevData, agentFullName,agentPhone:value.split(' ')[2]}));
    
  }

  
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
                    className="d-flex nav-pills mb-0 p-center profile-tab"
                    data-toggle="slider-tab"
                    id="profile-pills-tab"
                    role="tablist"
                  >
                    <Nav.Item as="li">
                      <Nav.Link eventKey="first">demand</Nav.Link>
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
                      <h4 className="card-title">Demand</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <form
                        action="/uploads"
                        method="POST"
                        encType="multipart/form-data"
                      >
                        <div className="input mb-3">
                          <h5 className="label label-default">
                            Client Full Name:
                          </h5>
                          <input
                            className="form-control"
                            name="clientFullName"
                            onChange={handleChange}
                          />
                          <br />
                          
                            <select
                              className="form-control"
                              name="agentFullName"
                              onChange={handleChangeDataAgent}
                            >
                             
                              <option value="">--Select Agent --</option>
                              {agentData.map((agent) => (
                                <option
                                  key={agent.id}
                                  value={`${agent.firstName} ${agent.lastName} ${agent.phone}`}
                                >                                    
                                    {`${agent.firstName} ${agent.lastName}`} 
                                </option>
                              ))}
                            </select>

                       
                          <br />
                          <h5>
                            <span className="label label-default">
                              Client Phone:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            name="clientPhone"
                            onChange={handleChange}
                          />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Agent Phone:
                            </span>
                          </h5>

                          <input
                            className="form-control"
                            name="agentPhone"
                            value={formData.agentPhone}
                            disabled
                            placeholder="select agent please"
                            // onChange={handleChange}
                          />
                          <br />
                          <h5>
                            <span className="label label-default">
                              Adresse:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                          />
                          <br />

                          <h5>
                            <span className="label label-default">
                              Command Description:
                            </span>
                          </h5>
                          <textarea
                            className="form-control"
                            name="commandDescription"
                            onChange={handleChange}
                          />
                          <br />
                          <br />
                          <Button
                            className=" btn-inner"
                            onClick={() => setShowQRCode(!showQRCode)}
                          >
                            Qr code
                            <AiOutlineQrcode />
                          </Button>
                        </div>
                      </form>
                       
                      {showQRCode && (
                        <div className="mt-3">
                          <QRCode value={JSON.stringify(formData)} />
                        </div>
                      )}
                    </div>
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

export default DemandClient;
