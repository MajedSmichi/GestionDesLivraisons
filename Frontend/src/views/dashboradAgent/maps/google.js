import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";

const GoogleAgent = () => {
  const defaultProps = {
    center: {
      lat: 36.8065,
      lng: 10.1815,
    },
    zoom: 10,
  };

  const [points, setPoints] = useState(
   { longitude:'',
    latitude:''}
  );
  const getCustomer= async () => {
    const token=localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/users/getAgent`,{
        headers: {
          Authorization: token,
        },
      });
      console.log(response)
      setPoints({longitude:response.data.longitude,latitude:response.data.latitude})
      
    } catch (error) {
      console.log(error);
    }
   
  };
  useEffect(() => {
    let id = setInterval(() => {
      getCustomer();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Agent map</h4>
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
           
                <div
                  lat={points.latitude}
                  lng={points.longitude}
                  text="My Marker"
                  style={{ height: 20, width: 20 }}
                >
                  <HiLocationMarker size={40} color='red' />
                  {/* <a href={"tel:" + phone}>
                  </a>  */}
                </div>
          </GoogleMapReact>
         
        </div>
      </Card.Body>
    </Card>
  );
};

export default GoogleAgent;
