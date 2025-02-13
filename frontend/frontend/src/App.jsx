import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const apiUrl = import.meta.env.VITE_API_URL;
const mapContainerStyle = { width: "100vw", height: "100vh" };
const defaultCenter = { lat: 0, lng: 0 };

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:apiUrl,
  });

  const [location, setLocation] = useState(defaultCenter);

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      setLocation({ lat: data.lat, lng: data.lng });
    });
  }, []);

  if (!isLoaded) return <h2>Loading Map...</h2>;

  return (
    <GoogleMap zoom={15} center={location} mapContainerStyle={mapContainerStyle}>
      <Marker position={location} />
    </GoogleMap>
  );
}

export default App;
