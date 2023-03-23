import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";

const GoogleClient = () => {
  const defaultProps = {
    center: {
      lat: 36.8065,
      lng: 10.1815,
    },
    zoom: 10,
  };

  const [points, setPoints] = useState([]);
  const getList = async () => {
    const response = await axios.get(`${apiUrl}/users/AllCustomersUsers`);
    setPoints(
      response.data.filter((point) => point.longitude && point.latitude)
    );
  };
  useEffect(() => {
    let id = setInterval(() => {
      getList();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Customer map</h4>
        </div>
        
      </Card.Header>
      <br/>
      <br/>
      <Card.Body className="p-1">
        <div id="map-container-google-2" className="z-depth-1-half map-container" style={{height: '500px'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {points.map(({ longitude, latitude, firstName, phone }, index) => {
              return (
                <div
                  key={index}
                  lat={latitude}
                  lng={longitude}
                  text="My Marker"
                  style={{ height: 20, width: 20 }}
                >
                  <a href={"tel:" + phone}>
                    <HiLocationMarker size={40} color='red' />
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

export default GoogleClient;
