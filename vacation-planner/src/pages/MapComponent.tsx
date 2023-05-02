import { useEffect, useRef } from "react";

export default function MapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {

  useEffect(() => {
    new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom,
    });
  });

  return <div id="map" />;
}