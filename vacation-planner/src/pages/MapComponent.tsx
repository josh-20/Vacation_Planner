import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import style from "../styles/map.module.css";
import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { query, collection, getDoc, addDoc, updateDoc, getDocs, where, doc, serverTimestamp, FieldValue, getCountFromServer, AggregateField } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db,rtdb } from "../../firebaseConfig";

export default function MapComponent({plannerId}: {plannerId: string}) {
  const [forecast, setForecast] = useState<{ date: string; avgTemp: number; high: number; low: number; rainChance: number; city: string; country: string }[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const geocoder = new google.maps.Geocoder();
  const [center, setCenter] = useState({ lat: 41, lng: -111 });
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCkj8pM8eahJEUCXj5Z85FeqiY739s3KJA" as string,
    libraries: ["places", "drawing", "geometry"],
  });
 

  console.log(plannerId)

  type Place = {
    id: string,
    lat: number,
    long: number,
    address: string,
    plannerId: string,
  }

  useEffect(() => {
    async function loadPlaces() {
      setPlaces([]);
      const placeRef = collection(db, `planners/${plannerId}/places`)
      const data = await getDocs(query(placeRef, where("plannerId", "==", plannerId)))
      const newPlaces: Place[] = [];
      data.forEach((doc) => {
        newPlaces.push({...doc.data(), id: doc.id} as Place);
      });
      setPlaces([...newPlaces])
      places.forEach(place => {
        const marker = {lat: place.lat, lng: place.long}
        setMarkers([...markers, marker])
      });
    };
    loadPlaces();
    if(places.length > 0){
      setCenter({lat: places[0].lat, lng: places[0].long})
    }
  }, [])
  useEffect(() => {
    if(!isLoaded) return;
  })
  useEffect(() => {
    if (!isLoaded) return;
    
    const key = "edab3a16d1fc4f7fa2e32357232904";
    const fetchWeatherData = async (lat: number, lng: number) => {
      const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lng}&days=3`;
      try {
        const response = await fetch(forecastWeatherUrl);
        const data = await response.json();
        console.log(data)
        const temperatureData = data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          avgTemp: day.day.avgtemp_f,
          high: day.day.maxtemp_f,
          low: day.day.mintemp_f,
          rainChance: day.day.daily_chance_of_rain,
          country: data.location.country,
          city: data.location.name,
        }));
        setForecast(temperatureData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLocationInfo = async (lat: number, lng: number) => {
      const latlng = {lat, lng}
      const place = {
        lat: lat,
        long: lng,
        address: ""
      } as Place;
      await geocoder.geocode({location: latlng})
      .then((res) => {
        if(res.results[0]){
          place.address =  res.results[0].formatted_address;
          place.id = res.results[0].place_id;
          place.plannerId = plannerId;
        }
      })
      console.log(place)
      console.log(places.indexOf(place))
      if(place.address != "" && places.indexOf(place) == -1){
        setPlaces([...places, place])
      }
      else{
        console.log("Unable to find address")
      }
    }
    markers.forEach(marker => {
      fetchWeatherData(marker.lat, marker.lng);
      fetchLocationInfo(marker.lat, marker.lng);
      console.log(places)
    });
  }, [isLoaded, markers]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newMarker = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };
      setMarkers(current => [...current, newMarker]);
      setCenter(newMarker);
  };

  const deletePlace = (place: Place) => {
    const marker = {lat: place.lat, lng: place.long}
    const placeArr = [...places];
    const markerArr = [...markers];
    const pIdx = placeArr.indexOf(place);
    const mIdx = markerArr.indexOf(marker);
    placeArr.splice(pIdx, 1);
    markerArr.splice(mIdx, 1);
    setMarkers(markerArr);
    setPlaces(placeArr);
    console.log(markers)
    if(markers.length != 0){
      setCenter(markers[0])
    }
    else{
      setCenter(center)
    }
    console.log(center)
  }

  const savePlaces = async () => {
    console.log("Saving...")
    console.log(places)
    const placeRef = collection(db, `planners/${plannerId}/places`)
    places.forEach(async (place) => {
      const docRef = await addDoc(placeRef, place);
      (place as Place).id = docRef.id
    });
  }

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div>
        <GoogleMap
          zoom={4}
          center={center}
          mapContainerClassName="map-container"
          onClick={handleMapClick}>
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
        <div className="row">
          <div className="col-sm-4 text-left">
            <div className={style.forecastCtn}>
              <ul>
                {forecast.map((item, index) => (
                  <li className={style.forecastData} key={index}>
                    <p>Date: {item.date}</p>
                    <p>Location: {item.city + ", " + item.country}</p>
                    <p>Average temperature: {item.avgTemp}F</p>
                    <p>High: {item.high}F</p>
                    <p>Low: {item.low}F</p>
                    <p>Rain chance: {item.rainChance}%</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-4 text-center">
          <button className={style.planButton} id={style.planButton} onClick={savePlaces}>Save</button>
          </div>
            <ul className="col-sm-4 text-left">
              {places.map((place, index) => (
                <li className={style.placeData} key={index}>
                  <div className={style.placeData}>
                    Address: {place.address}  
                    <button className={style.planButton} onClick={() => deletePlace(place)}>Delete</button>
                  </div>
                </li>
              )) }
            </ul>
            
          
        </div>
      </div>
    </>
    
  );
}



