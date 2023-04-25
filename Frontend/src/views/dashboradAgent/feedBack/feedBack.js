import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

import { apiUrl } from "../../../Constants";
import axios from "axios";
import QRCode from "qrcode.react";
import "../../../style.css";

const FeedBackList = () => {
  const [feedBack, setFeedBack] = useState([]);

  const getFeedBack = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/users/getFeedBack`, {
        headers: { Authorization: token },
      });
      setFeedBack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedBack();
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">FeedBackList</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  {feedBack.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Client Name</th>
                          <th>Rate/5</th>
                          <th>Feedback</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedBack.map((feedBack, index) => (
                          <tr key={index}>
                            <td style={{ width: "150px" }}>
                              {feedBack.clientName}
                            </td>
                            <td style={{ width: "150px" }}>{feedBack.rate}</td>
                            <td className="fixed-width-td ">
                              {feedBack.data}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No feedBacks found.</p>
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

export default FeedBackList;
