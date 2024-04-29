/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 40.7128, lng: -74.006 });
  const [destination, setDestination] = useState("");
  const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number, lng: number } | null>(null);
  const [polylinePath, setPolylinePath] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => ({
        lat: prevPosition.lat + Math.random() * 0.1 - 0.05,
        lng: prevPosition.lng + Math.random() * 0.1 - 0.05,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleShowRoute = () => {
    if (destination.trim() !== "") {
      setIsLoading(true);
      // Use geocoding API to get coordinates of the destination
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`)
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setDestinationCoordinates({ lat: location.lat, lng: location.lng });
          } else {
            console.error("Destination not found");
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error("Error geocoding destination:", error);
        });
    }
  };

  useEffect(() => {
    if (destinationCoordinates) {
      // Calculate the path between current position and destination
      const path = [currentPosition, destinationCoordinates];
      setPolylinePath(path);
    }
  }, [currentPosition, destinationCoordinates]);

  return (
    <div>
      <div>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={8}>
          <div className="flex gap-2 absolute top-2 left-60">
            <h1 className="text-black font-bold text-3xl">Google Maps Route</h1>
          </div>
          <div className="flex gap-2 absolute top-2 right-24">
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={handleDestinationChange}
              className="bg-white text-black rounded px-2 border-none"
            />
            <button
              onClick={handleShowRoute}
              className="bg-white text-black rounded font-bold border-none hover:bg-slate-200"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show Route"}
            </button>
          </div>
          {polylinePath.length > 0 && (
            <Polyline
              path={polylinePath}
              options={{ strokeColor: "#FF0000" }}
            />
          )}
          <Marker position={currentPosition} title='Your location' />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
