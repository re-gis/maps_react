
// const Maps = () => {
//   return (
//     <div>
//       <h1>Google Maps Route</h1>
//     </div>
//   );
// };

// export default Maps;
// import React, { useState, useEffect } from "react";
// import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100vw",
//   height: "91vh",
// };

// const initialPath = [
//   { lat: 40.7128, lng: -74.006 },
//   { lat: 34.0522, lng: -118.2437 },
// ];

// const center = {
//   lat: 7.2905715,
//   lng: 80.6337262,
// };

// const Map: React.FC = () => {
//   const [currentPosition, setCurrentPosition] = useState({ lat: 40.7128, lng: -74.006 });
//   const [destination, setDestination] = useState("");
//   const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number, lng: number } | null>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPosition((prevPosition) => ({
//         lat: prevPosition.lat + Math.random() * 0.1 - 0.05,
//         lng: prevPosition.lng + Math.random() * 0.1 - 0.05,
//       }));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           console.log("Current location:", position.coords.latitude, position.coords.longitude);
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//         }
//       );
//       console.log("Current location can be found");

//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDestination(event.target.value);
//   };

//   const handleShowRoute = () => {
//     if (destination.trim() !== "") {
//       // Use geocoding or any other method to get the coordinates of the destination
//       // For simplicity, setting random coordinates here
//       const destCoordinates = {
//         lat: center.lat + Math.random() * 10 - 5,
//         lng: center.lng + Math.random() * 10 - 5,
//       };
//       setDestinationCoordinates(destCoordinates);
//     }
//   };

//   return (
//     <div>
//       <div className="py-2">
//         <h1 className="text-blue-400 font-bold text-3xl">Google Maps Route</h1>
//       </div>
//       <div>
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={8}>
//           {/* <Polyline path={initialPath} options={{ strokeColor: "#FF0000" }} />
//           <Polyline path={[initialPath[0], currentPosition]} options={{ strokeColor: "#0000FF" }} /> */}
//           <div className="flex gap-2 absolute top-2 right-24">
//             <input
//               type="text"
//               placeholder="Enter destination"
//               value={destination}
//               onChange={handleDestinationChange}
//               className="bg-white text-black rounded"
//             />
//             <button
//               onClick={handleShowRoute}
//               className="bg-white text-black rounded font-bold border-none hover:bg-slate-200"
//             >Show Route</button>
//           </div>
//           <Polyline
//             path={[currentPosition, destinationCoordinates]}
//             options={{ strokeColor: "#FF0000" }}
//           />
//           <Marker position={currentPosition} title='Your location' />
//           {/* <Marker position={center} title='Your location' /> */}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// };

// export default Map;

// if (destination.trim() !== "") {
//   const destCoordinates = {
//     lat: center.lat + Math.random() * 10 - 5,
//     lng: center.lng + Math.random() * 10 - 5,
//   };
//   setDestinationCoordinates(destCoordinates);
// }