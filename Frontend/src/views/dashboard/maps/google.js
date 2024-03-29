import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import {BsWhatsapp} from "react-icons/bs"
import {AiFillPhone} from "react-icons/ai"
import { Image } from "react-bootstrap";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const getListAgent = async () => {
    const response = await axios.get(`${apiUrl}/users/getAllAgent`, {
      headers: {
        Authorization: token,
      },
    });
    for (const agent of response.data) {
      setPoints((points) => points.filter((point) => point.id !== agent._id));
    }
    response.data.map((agent) => {
      if (agent.longitude && agent.latitude) {
        setPoints((points) => [
          ...points,
          {
            longitude: agent.longitude,
            latitude: agent.latitude,
            id: agent._id,
            phone: agent.phone,
            role: "2",
            photo: agent.photoUrl,
            firstName: agent.firstName,
            lastName: agent.lastName,
            whatsApp: agent.whatsApp,
          },
        ]);
      }
    });
  };
  const getListCustomer = async () => {
    const response = await axios.get(`${apiUrl}/users/AllCustomersUsers`, {
      headers: {
        Authorization: token,
      },
    });
    
    for (const customer of response.data) {
      setPoints((points) => points.filter((point) => point.id !== customer._id));
    }
    response.data.map((customer) => {
      if (customer.longitude && customer.latitude) {
        setPoints((points) => [
          ...points,
          {
            longitude: customer.longitude,
            latitude: customer.latitude,
            id: customer._id,
            phone: customer.phone,
            role: "1",
            photo: customer.photoUrl,
            firstName: customer.firstName,
            lastName: customer.lastName,
            whatsApp: customer.whatsApp,
          },
        ]);
      }
    });
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

  const handleMarkerClick = (user) => {
    console.log({ user });
    setSelectedUser(user);
  };

  

  return (
    <div >
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
            onGoogleApiLoaded={({ map, maps }) => {
              console.log({ map });
              setMapApi(map);
            }}
          >
            {points.map((item, index) => (
              <div
                key={index}
                lat={item.latitude}
                lng={item.longitude}
                text="My Marker"
                style={{ position: "relative", height: 20, width: 20 }}
                
                onClick={() => item.role && handleMarkerClick(item)}
              >
                <HiLocationMarker
                  size={40}
                  color={item.role==="2" ? "red" : "blue"}
                  cursor={"pointer"}
                />
              </div>
            ))}
          </GoogleMapReact>
          {selectedUser && (
            <CardAgent
              user={selectedUser}
              mapApi={mapApi}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};
const CardAgent = ({ user, mapApi, onClose }) => {
  const worldCoordinate = mapApi
    .getProjection()
    .fromLatLngToPoint(
      new window.google.maps.LatLng(user.latitude, user.longitude)
    );
  const pixelCoordinate = new window.google.maps.Point(
    worldCoordinate.x + 100,
    worldCoordinate.y + 350
  );

  const cardStyle = {
    position: "absolute",
    top: `${pixelCoordinate.x}px`,
    left: `${pixelCoordinate.y}px`,
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
    borderRadius: "10px",
  };

  return (
    <div style={cardStyle}>
      <Image
        className="bg-soft-primary rounded img-fluid avatar-40 me-3"
        src={`${apiUrl}/` + user.photo}
        alt="profile"
      />
      <div>
        {user.firstName } {user.lastName}
      </div>

      <div>
        <a href={"tel:" + user.phone}>Phone :{user.phone} <AiFillPhone size={20}/></a>
      </div>

      <div>
        <a href={`https://wa.me/${user.whatsApp}`}  target="_blank"  rel="noopener noreferrer">WhatsApp: {user.whatsApp} <BsWhatsapp size={20}/></a> 
      </div>
      <button
        onClick={onClose}
        style={{ borderRadius: "5px", borderColor: "blue" }}
      >
        Close
      </button>
    </div>
  );
};

export default Google;
