import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";

const token=localStorage.getItem('token');
const Google = () => {
  const defaultProps = {
    center: {
      lat: 36.8065,
      lng: 10.1815,
    },
    zoom: 10,
  };

  const [points, setPoints] = useState([]);
  const getListAgent = async () => {
    const response = await axios.get(`${apiUrl}/users/getAllAgent`, {
      headers: {
        Authorization: token,
      },
    });

      for(const agent of response.data){
        setPoints(points=>points.filter(point=>point.id!==agent._id))
      }
      response.data.map(agent=>{
        if (agent.longitude && agent.latitude){
          setPoints(points=> ([...points,{longitude:agent.longitude,latitude:agent.latitude,id:agent._id,phone:agent.phone,role:'2'}]))
        }
      } )
  };
  const getListCustomer = async () => {
    const response = await axios.get(`${apiUrl}/users/AllCustomersUsers`, {
      headers: {
        Authorization: token,
      },
    });
    for(const customer of response.data){
      setPoints(points=>points.filter(point=>point.id!==customer._id))
    }
    response.data.map(customer=>{
      if(customer.longitude && customer.latitude){
        setPoints(points=> ( [...points,{longitude:customer.longitude,latitude:customer.latitude,id:customer._id,phone:customer.phone,role:'1'}]))
      }
    } )
  };

  useEffect(() => {
    let id = setInterval(async() => {
    await getListAgent();
    await getListCustomer();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Admin map</h4>
        </div>
      </Card.Header>
      <br />
      <br />
      <Card.Body className="p-1">
        <div
          id="map-container-google-2"
          className="z-depth-1-half map-container"
          style={{ height: "500px" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {points.map(({ longitude, latitude, phone,role }, index) => {
              return (
                <div
                  key={index}
                  lat={latitude}
                  lng={longitude}
                  text="My Marker"
                  style={{ height: 20, width: 20 }}
                >
                  <a href={"tel:" + phone}>
                    <HiLocationMarker size={40} color={role==="1"?"blue":"red"} />
                  </a>
                </div>
              );
            })}
          </GoogleMapReact>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Google;
