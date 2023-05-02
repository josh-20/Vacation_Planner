import { useEffect, useState, useRef } from "react"

export default function Planner() {

    const [map, setMap] = useState<google.maps.Map>();
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
    const [mapSearch, setMapSearch] = useState("");
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    useEffect(() => {
        setMap(new google.maps.Map(document.getElementById("map") as HTMLElement, {center: center, zoom: zoom, mapTypeId: "roadmap"}))
        setSearchBox(new google.maps.places.SearchBox(document.getElementById("mapSearch") as HTMLInputElement))
        map!.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById("mapSearch") as HTMLInputElement);
        map?.addListener("bound_changed", () => {
            searchBox?.setBounds(map.getBounds() as google.maps.LatLngBounds)
        })
        searchBox!.addListener("places_changed", () => {
            const places = searchBox!.getPlaces();
        
            if (places!.length == 0) {
              return;
            }
        
            // Clear out the old markers.
            setMarkers([]);
        
            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
        
            places!.forEach((place) => {
              if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
              }
        
              const icon = {
                url: place.icon as string,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
              };
        
              // Create a marker for each place.
              markers.push(
                new google.maps.Marker({
                  map,
                  icon,
                  title: place.name,
                  position: place.geometry.location,
                })
              );
        
              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map!.fitBounds(bounds);
          });
    }, [])



    return (
        <div className="center row">
            <div className="center col">
                <input id="mapSearch" onChange={e => setMapSearch(e.target.value)}></input>
                <div id="map"></div>
            </div>
                
            <div className="center col">
                Put your places here
            </div>
        </div>
    )
}