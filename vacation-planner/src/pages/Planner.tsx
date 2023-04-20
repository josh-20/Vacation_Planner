import { watch } from "fs";
import { useState,useEffect } from "react"
export default function Planner() {
    const [longitude,setLongitude] = useState(0);
    const[latitude,setLatitude] = useState(0);

    useEffect (() => { 
          const watch = navigator.geolocation.watchPosition((location) => {
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
          }, (err) => {
            console.log(err);
          }, {
            enableHighAccuracy: true,
          });
          return() => navigator.geolocation.clearWatch(watch);
      },[])
    return (
        <div>
            <div>
                Long: {longitude}
                Lat: {latitude}
            </div>
            Planner Page!
        </div>
    )
}