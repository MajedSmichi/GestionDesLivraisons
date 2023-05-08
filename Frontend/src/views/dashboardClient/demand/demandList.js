import React, { useContext, useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

import { apiUrl } from "../../../Constants";
import axios from "axios";
import QRCode from "qrcode.react";
import "../../../style.css";
import { customerContext } from "../../../App";

const DemandList = () => {
  const [demands, setDemands] = useState([]);

  const { userData, setUserData } = useContext(customerContext);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getCustomer`, {
        headers: {
          Authorization: token,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDemands = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getDemands`, {
        headers: { Authorization: token },
      });
      const demandsClient = response.data.filter(
        (demand) => demand.clientData._id === userData._id
      );
      setDemands(demandsClient);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getDemands();
  }, [userData]);

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
                  {demands.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Agent Name</th>
                          <th> </th>
                          <th>Command Description</th> <th> </th>
                          <th>QR Code</th>
                          <th>State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demands.map((demand, index) => (
                          <tr key={index}>
                            <td style={{ width: "150px" }}>
                              {`${demand.agentData.firstName} ${demand.agentData.lastName}`}
                            </td>
                            <td></td>
                            <td style={{ width: "150px", textAlign: "center" }}>
                              {`${demand.commandDescription}`}
                            </td>
                            <td></td>
                            <td>
                              <QRCode
                                value={`ClientName:${userData.firstName} ${userData.lastName}  \nClientPhone:${userData.phone}\nClientAdress:${userData.adresse}\nAgentName:${demand.agentData.firstName} ${demand.agentData.lastName}\nCommandDescription:${demand.commandDescription}`}
                                size={100}
                              />
                            </td>
                            {demand.status === "new" ? (
                              <td
                                className="fixed-width-td "
                                style={{ backgroundColor: "blue" }}
                              >
                                waiting for validation
                              </td>
                            ) : demand.status === "ancienrejected" ? (
                              <td
                                className="fixed-width-td "
                                style={{ backgroundColor: "red" }}
                              >
                                {demand.status}
                              </td>
                            ) : (
                              <td
                                className="fixed-width-td "
                                style={{ backgroundColor: "green" }}
                              >
                                {demand.status}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No demands found.</p>
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

export default DemandList;
