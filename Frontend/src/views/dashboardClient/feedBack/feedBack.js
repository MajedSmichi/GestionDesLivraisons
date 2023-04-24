import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Card, Col, TabContainer, Tab } from "react-bootstrap";
import { apiUrl } from "../../../Constants";


const token = localStorage.getItem("token");
const Feedback = () => {
  const [agentData, setAgentData] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });
  const [feedbackData, setFeedbackData] = useState({
    rate: "",
    receiverAgent: "",
    agentName: "",
    data: "",
    clientName: "",
    emailAgent:" "
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };
  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/getCustomer`, {
        headers: {
          Authorization: token,
        },
      });
      setUserData(response.data);
      feedbackData.clientName = userData.firstName + " " + userData.lastName;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (feedbackData.rate === "") {
      setError("rate your agent");
      return;
    }
    if (feedbackData.agentName === "") {
      setError("select an agent please");
      return;
    }
    if (feedbackData.data === "") {
      setError("enter your description");
      return;
    }
    try {
      await axios.post(
        `${apiUrl}/users/addFeedback`,
        { ...feedbackData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      setSuccessMessage("feedbackcreated");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Failed to create feedback:", error);
    }
  };

  const getAllAgent = async () => {
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

  const handleChangeDataAgent = (e) => {
    const { value } = e.target;
    const receiverAgent = value.split(" ")[2];
    const agentName = value.split(" ")[0] + value.split(" ")[1];
    
    setFeedbackData((prevData) => ({
      ...prevData,
      agentName: agentName,
      receiverAgent: receiverAgent,
      emailAgent:value.split(" ")[3]
    }));
  };

  return (
    <TabContainer>
      <Col lg="12">
        <Card>
          <Card.Body>Feedback</Card.Body>
        </Card>
      </Col>
      <Col md={{ span: 8, offset: 2 }}>
        <Tab.Content className="profile-content">
          <Card>
            <Card.Body>
              {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
              )}
              <p>Select your rate:</p>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="0"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="0">0</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="1"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="1">1</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="2"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="2">2</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="3"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="3">3</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="4"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="4">4</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rate"
                  value="5"
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                />
                <label for="5">5</label>
              </div>
              <br></br>
              <p>Select the Agent:</p>
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
                    onChange={handleChangeDataAgent}
                    value={`${agent.firstName} ${agent.lastName} ${agent._id} ${agent.email}`}
                  >
                    {`${agent.firstName} ${agent.lastName}`}
                  </option>
                ))}
              </select>
              <br></br>
              <p>Enter your feedback:</p>
              <div>
                <textarea
                  type="text"
                  name="data"
                  placeholder=""
                  onChange={handleInputChange}
                  onFocus={() => setError("")}
                  value={feedbackData.data}
                  style={{
                    borderRadius: "5px",
                    height: "100px",
                    width: "100%",
                  }}
                />
              </div>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <p>
                <br></br>
                <button
                  id="btn"
                  onClick={handleSubmit}
                  style={{
                    borderRadius: "5px",
                    border: "0",
                    backgroundColor: "#33a6f5",
                    height: "50px",
                    width: "170px",
                  }}
                >
                  Rate Now!
                </button>
              </p>
            </Card.Body>
          </Card>
        </Tab.Content>
      </Col>
    </TabContainer>
  );
};

export default Feedback;
