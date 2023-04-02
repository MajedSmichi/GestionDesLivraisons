import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import Card from "../../../components/Card";

import { Rings } from "react-loader-spinner";
import axios from "axios";
import { apiUrl } from "../../../Constants";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiSave } from "react-icons/fi";
import moment from "moment";


const UserListAgent = () => {
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [ agentData, setAgentData ] = useState([]);
  useEffect(() => {
    getAllAgent();
  }, []);

  const getAllAgent = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/getAllagent`);
      setAgentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteuser = async (item) => {
    const token=localStorage.getItem('token')
    try {
      await axios.delete(`${apiUrl}/users/deleteAgent/${item._id}`,{
        headers:{
          Authorization: token
        }
      });
      getAllAgent();
    } catch (error) {
      console.log(error);
    }
  };
  const updateuser = async (item, idx) => {
    setEditData(null);
    const token=localStorage.getItem('token')
    try {
      setLoading(true);
      const response = await axios.put(
        `${apiUrl}/users/updateAgent/${item._id}`,
        item,{
          headers:{
            Authorization: token
          }
        }
      );
      setAgentData((prevState) => {
        const newData = [...prevState];
        newData[idx] = response.data;
        return newData;
      });
      getAllAgent();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">User List</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>Profile</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Join Date</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Rings
                          height="80"
                          width="100%"
                          color="#4fa94d"
                          radius="6"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="rings-loading"
                        />
                      ) : (
                        agentData.map((item, idx) => {
                          if (editData === idx) {
                            return (
                              <tr key={idx}>
                                <td className="text-center grow">
                                     {  <Image
                                  className="bg-soft-primary rounded img-fluid avatar-40 me-3"
                                  src={"http://localhost:5000/" + item.photoUrl}
                                  alt="profile"
                                />}
                                </td>
                                <td>
                                  <input
                                    value={item.firstName}
                                    onChange={(e) => {
                                      const user = {
                                        ...agentData[idx],
                                        firstName: e.target.value,
                                      };
                                      agentData[idx] = user;
                                      setAgentData([...agentData]);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    value={item.lastName}
                                    onChange={(e) => {
                                      const user = {
                                        ...agentData[idx],
                                        lastName: e.target.value,
                                      };
                                      agentData[idx] = user;
                                      setAgentData([...agentData]);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    value={item.phone}
                                    onChange={(e) => {
                                      const user = {
                                        ...agentData[idx],
                                        phone: e.target.value,
                                      };
                                      agentData[idx] = user;
                                      setAgentData([...agentData]);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    value={item.email}
                                    onChange={(e) => {
                                      const user = {
                                        ...agentData[idx],
                                        email: e.target.value,
                                      };
                                      agentData[idx] = user;
                                      setAgentData([...agentData]);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    value={item.adresse}
                                    onChange={(e) => {
                                      const user = {
                                        ...agentData[idx],
                                        adresse: e.target.value,
                                      };
                                      agentData[idx] = user;
                                      setAgentData([...agentData]);
                                    }}
                                  />
                                </td>
                                <td>{moment(item.joinDate).format('DD/MM/YYYY')}</td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <button
                                      className="btn-inner btn-sm btn-icon btn btn-warning"
                                      onClick={() => updateuser(item, idx)}
                                    >
                                      <FiSave />
                                    </button>{" "}
                                  </div>
                                </td>
                              </tr>
                            );
                          }

                          return (
                            <tr key={idx}>
                              <td className="text-center grow">
                          
                              {  <Image
                                  className="bg-soft-primary rounded img-fluid avatar-40 me-3"
                                  src={"http://localhost:5000/" + item.photoUrl}
                                  alt="profile"
                                />}
                              </td>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.phone}</td>
                              <td>{item.email}</td>
                              <td>{item.adresse}</td>
                              <td>{moment(item.joinDate).format('DD/MM/YYYY')}</td>
                              <td>
                                <div className="flex align-items-center list-user-action">
                                  <button
                                    className="btn-inner btn-sm btn-icon btn btn-warning"
                                    onClick={() => setEditData(idx)}
                                  >
                                    <FiEdit />
                                  </button>{" "}
                                  <button
                                    className="btn-inner btn-sm btn-icon btn btn-danger"
                                    onClick={() => deleteuser(item)}
                                  >
                                    <AiOutlineDelete />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserListAgent;
