import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";

import { Row, Col, Nav, Tab, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { AiOutlineQrcode } from "react-icons/ai";
import { apiUrl } from "../../../Constants";
import axios from "axios";
import { customerContext } from "../../../App";
const token = localStorage.getItem("token");
const user=localStorage.getItem("user");

const DemandClient = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  
  const { userData, setUserData } = useContext(customerContext);
  const [agentData, setAgentData] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    clientName:`${userData.firstName} ${userData.lastName}`,
    data:`${userData.firstName} ${userData.lastName} send you a demand`,
    receiver:user,
    agentName: "",
    clientPhone: `${userData.phone}`,
    agentPhone:"",
    adress:`${userData.adresse}`,
    commandDescription: "",
    receiverAgent:""
  });

  const getUserData = async () => {
    try {
      
      const response = await axios.get(`${apiUrl}/users/getCustomer`,{
        headers:{
          Authorization: token
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 

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
    getUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleChangeDataAgent=(e)=>{
    const  {value}  = e.target;
    const receiverAgent=value.split(' ')[3];
    const agentName = value.split(' ')[0]+value.split(' ')[1]
    setFormData((prevData) => ({ ...prevData, agentName,receiverAgent,agentPhone:value.split(' ')[2]}));
    
  }

  const createDemand= async ()=> {
    if(formData.agentPhone==="")
    {setError('select an agent')
    return}
    if(formData.commandDescription===""){
      setError('enter your command description')
      return
    }
    try {
    
     await axios.post(`${apiUrl}/users/createDemand`,{...formData},{
        headers: {
          Authorization: token,
        },
      })
      const Data=formData.clientName + " send a demand to " + formData.agentName
      const reciverAdmin="0"
      await axios.post(`${apiUrl}/users/createDemand`,{...formData,data:Data,receiver:reciverAdmin},{
        headers: {
          Authorization: token,
        },
      })
      setShowQRCode(true);
    } catch (error) {
      console.error(error)
    }
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
                            name="clientName"
                            onChange={handleChange}
                            value={userData.firstName +" "+ userData.lastName}
                            disabled
                          />
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
                            value={userData.phone }
                            disabled
                          />
                          <br />

                          <h5>
                            <span className="label label-default">
                              Client Adress:
                            </span>
                          </h5>
                          <input
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            value={userData.adresse }
                            disabled
                          />
                          <br />
                          
                          <h5 className="label label-default">
                            Agent Full Name:
                          </h5>
                            <select
                              className="form-control"
                              name="agentName"
                              onChange={handleChangeDataAgent}
                              onFocus={() => setError("")}
                            >
                             
                              <option value="">--Select Agent --</option>
                              {agentData.map((agent) => (
                                <option
                                  key={agent.id}
                                  
                                  value={`${agent.firstName} ${agent.lastName} ${agent.phone} ${agent._id}`}
                                >                                    
                                    {`${agent.firstName} ${agent.lastName}`} 
                                    
                                </option>
                              ))}
                            </select>
                          
                       
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
                            onFocus={() => setError("")}
                          />
                          <br />
                          <br />
                          {error && (
                          <p style={{ color: "red", textAlign: "center" }}>
                            {error}
                          </p>
                        )}
                          <Button
                            className=" btn-inner"
                            onClick={createDemand}
                          >
                            Qr code
                            <AiOutlineQrcode />
                          </Button>
                        </div>
                      </form>
                       
                      {showQRCode && (
                        <div className="mt-3">
                          <QRCode value={`clientName:${formData.clientName}\nclientPhone:${formData.clientPhone}\nClientAdress:${formData.adress}\nagentName:${formData.agentName}\ncommandDescription:${formData.commandDescription}`} size={100} />
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
