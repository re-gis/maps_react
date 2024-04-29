/* eslint-disable @typescript-eslint/no-unused-vars */

import './App.css'
import { LoadScript } from '@react-google-maps/api'
import Map from './components/Map'
// import Maps from './components/Maps'

function App() {
  return (
    // <LoadScript googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
    <LoadScript
      googleMapsApiKey="AIzaSyCeWa9GnzWXG9l6_DCTo4qq2SS9sYDV-Z8"
      libraries={["places"]}
    >
      <Map />
    </LoadScript>
  );
}

export default App
