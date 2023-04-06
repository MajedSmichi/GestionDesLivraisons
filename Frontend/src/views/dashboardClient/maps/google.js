import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import { Image } from "react-bootstrap";

const token = localStorage.getItem("token");
const GoogleClient = () => {
  const defaultProps = {
    center: {
      lat: 36.8065,
      lng: 10.1815,
    },
    zoom: 10,
  };

  const [points, setPoints] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapApi, setMapApi] = useState(null)

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
          },
        ]);
      }
    });
  };
  const getCustomer = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/users/getCustomer`, {
        headers: {
          Authorization: token,
        },
      });
      setPoints((points) => [
        ...points,
        {
          longitude: response.data.longitude,
          latitude: response.data.latitude,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let id = setInterval(async () => {
      await getCustomer();
      await getListAgent();
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
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Customer map</h4>
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
              // do something with the `map` and `maps` objects
              console.log({map})
              setMapApi(map)
            }}
          >
            {points.map((item, index) => (
              <div
                key={index}
                lat={item.latitude}
                lng={item.longitude}
                text="My Marker"
                style={{ position: "relative", height: 20, width: 20 }}
                onClick={() => item.role === "2" && handleMarkerClick(item)}
              >
                <HiLocationMarker
                  size={40}
                  color={item.role ? "red" : "blue"}
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
  );
};

const CardAgent = ({ user,mapApi, onClose }) => {
  const worldCoordinate = mapApi.getProjection().fromLatLngToPoint(new window.google.maps.LatLng(user.latitude, user.longitude));
  const pixelCoordinate = new window.google.maps.Point(
    worldCoordinate.x+100 ,
    worldCoordinate.y+350
  );

 
  const cardStyle = {
    position: "absolute",
    top: `${pixelCoordinate.x}px`,
    left: `${pixelCoordinate.y}px`,
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
    borderRadius: '10px'
  };

  return (
    <div style={cardStyle}>
      <div>{user.phone}</div>
      <Image
        className="bg-soft-primary rounded img-fluid avatar-40 me-3"
        src={"http://localhost:5000/" + user.photo}
        alt="profile"
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default GoogleClient;
