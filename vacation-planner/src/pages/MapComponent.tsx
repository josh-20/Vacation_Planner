import { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent(){
  const { isLoaded } = useLoadScript({ googleMapsApiKey:  "AIzaSyCkj8pM8eahJEUCXj5Z85FeqiY739s3KJA" as string });
  if(!isLoaded) return <div>Loading...</div>;
  return(
    <Map />
  )
}
function Map() {
  
  return <GoogleMap zoom={4} center={{ lat: 41, lng: -111}} mapContainerClassName="map-container">
  </GoogleMap>
}