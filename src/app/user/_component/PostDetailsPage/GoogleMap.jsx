import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MyGoogleMap = ({ location }) => {
  const center = {
    lat: location?.lat,
    lng: location?.lng,
  };
  const apiKey = "AIzaSyB2zI6llsCgJHl82vznsE0LL15lLV03CNI";
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMap;
