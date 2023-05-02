import { useEffect, useState, ReactElement } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";

export default function Planner() {

    const [map, setMap] = useState<google.maps.Map>();
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    /*useEffect(() => {
        setMap(new google.maps.Map(document.getElementById("map") as HTMLElement, {center: center, zoom: zoom, mapTypeId: "roadmap"}))
        setSearchBox(new google.maps.places.SearchBox(document.getElementById("mapSearch") as HTMLInputElement))
        //map!.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById("mapSearch") as HTMLInputElement);
        map?.addListener("bound_changed", () => {
            searchBox?.setBounds(map.getBounds() as google.maps.LatLngBounds)
        })
        debugger;
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
    }, [])*/

    const render = (status: Status): ReactElement => {
      if (status === Status.LOADING) return <h3>{status} ..</h3>;
      if (status === Status.FAILURE) return <h3>{status} ...</h3>;
      return <h3>Done!</h3>
    };

    return (
        <div className="center row">
            <div className="center col">
                <Wrapper apiKey="AIzaSyAcgKDA_KwT_x_syIKsQHuzERyu2BmEJPI" render={render}>
                  <MapComponent center={center} zoom={zoom}></MapComponent>
                </Wrapper>
            </div>
                
            <div className="center col">
                Put your places here
            </div>
        </div>
    )
}