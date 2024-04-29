/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState("");
  const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number, lng: number } | null>(null);
  const [polylinePath, setPolylinePath] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update current position after every ten seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => ({
        lat: prevPosition.lat + Math.random() * 0.1 - 0.05,
        lng: prevPosition.lng + Math.random() * 0.1 - 0.05,
      }));
    }, 1000000);

    return () => clearInterval(interval);
  }, []);

  // Fetch current location using geolocation api
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

  // Handle change in destination input
  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleShowRoute = () => {
    if (destination.trim() !== "") {
      setIsLoading(true);
      // Fetch route from current position to destination using Directions API
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING, // Adjust this based on your requirements
        },
        (response, status) => {
          setIsLoading(false);
          if (status === window.google.maps.DirectionsStatus.OK) {
            const path = response.routes[0].overview_path.map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
            setPolylinePath(path);
          } else {
            console.error("Error fetching route:", status);
          }
        }
      );
    }
  };

  // Update polyline path when destination coordinates change
  useEffect(() => {
    if (destinationCoordinates) {
      // Calculate the path between current position and destination
      const path = [currentPosition, destinationCoordinates];
      setPolylinePath(path);
    } else {
      // If destination coordinates are not available, just include the current position
      setPolylinePath([currentPosition]);
    }
  }, [currentPosition, destinationCoordinates]);



  useEffect(() => {
    const inputElement = document.getElementById("input") as HTMLInputElement;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.error("No details available for input:", place.name);
        return;
      }
      setDestination(place.formatted_address || '');
      setDestinationCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });

  }, [destination]);

  return (
    <div>
      <div>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={8}>
          <div className="flex gap-2 absolute top-2 left-60">
            <h1 className="text-black font-bold text-3xl">Google Maps Route</h1>
          </div>
          <div className="flex gap-2 absolute top-2 right-24">
            <input
              id="input"
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={handleDestinationChange}
              autoComplete="true"
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
          {/* Draw polyline after the user had inserted the destination */}
          {polylinePath.length > 0 && (
            <Polyline
            path={polylinePath}
            options={{ strokeColor: "#FF0000" }}
            />
          )}
          {/* Display the user location by the use of a marker */}
          <Marker position={currentPosition} title='Your location' />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
