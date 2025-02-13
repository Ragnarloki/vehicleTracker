import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("updateLocation", { lat: latitude, lng: longitude });
          console.log("Sent location:", latitude, longitude);
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
  }, []);

  return <h2>Driver Location Tracker Running...</h2>;
}

export default App;
