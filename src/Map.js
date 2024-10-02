import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Define styles and dimensions of the map
const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1YopGX9pi7LHZbClS1DoNaUDh9JNgIjw", // Replace with your actual API key
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }} // Use lat/lng passed as props
      zoom={11} // Adjust zoom level (10 is city-level)
    >
      {/* Marker to indicate the center of the map */}
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default Map;