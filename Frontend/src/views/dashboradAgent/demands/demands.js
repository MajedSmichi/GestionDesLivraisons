import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

import { apiUrl } from "../../../Constants";
import axios from "axios";
import QRCode from "qrcode.react";
import "../../../style.css";

const DemandAgent = () => {
  const [demands, setDemands] = useState([]);
  const [newdemands, setnewDemands] = useState([]);


  const getDemands = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getDemands`, {
        headers: { Authorization: token },
      });
      setDemands(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDemands();
   
  }, []);

  useEffect(() => {
    const isNewDem = demands.filter(
      ({ status }) => status === "ancienAccepted"
    );
    setnewDemands(isNewDem);
    
  }, [demands]);

 

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Demand</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  {newdemands.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Client Name</th>
                          <th>Client Phone</th>
                          <th>Client Address</th>
                          <th>Agent Name</th>
                          <th>Command Description</th>
                          <th>QR Code</th>{" "}
                          {/* Add new column header for QR code */}
                        </tr>
                      </thead>
                      <tbody>
                        {newdemands.map((demand, index) => (
                          <tr key={index}>
                            <td style={{ width: "150px" }}>
                              {demand.clientName}
                            </td>
                            <td style={{ width: "150px" }}>
                              {demand.clientPhone}
                            </td>
                            <td style={{ width: "150px" }}>{demand.adress}</td>
                            <td style={{ width: "150px" }}>
                              {demand.agentName}
                            </td>
                            <td className="fixed-width-td ">
                              {demand.commandDescription}
                            </td>
                            <td>
                              <QRCode
                                value={`clientName:${demand.clientName}\nclientPhone:${demand.clientPhone}\nClientAdress:${demand.adress}\nagentName:${demand.agentName}\ncommandDescription:${demand.commandDescription}`}
                                size={100}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No demands  found.</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DemandAgent;
