import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCkj8pM8eahJEUCXj5Z85FeqiY739s3KJA" as string,
    libraries: ["places", "drawing", "geometry"],
  });

  const [center, setCenter] = useState({ lat: 41, lng: -111 });
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newMarker = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };
    setMarkers(current => [...current, newMarker]);
    setCenter(newMarker);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={4}
      center={center}
      mapContainerClassName="map-container"
      onClick={handleMapClick}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  );
}



