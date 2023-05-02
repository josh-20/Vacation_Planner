import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import style from "../styles/map.module.css";

export default function MapComponent() {
  const [forecast, setForecast] = useState<{ date: string; avgTemp: number; high: number; low: number; rainChance: number; city: string; country: string }[]>([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCkj8pM8eahJEUCXj5Z85FeqiY739s3KJA" as string,
    libraries: ["places", "drawing", "geometry"],
  });

  const [center, setCenter] = useState({ lat: 41, lng: -111 });
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  useEffect(() => {
    if (!isLoaded) return;
    
    const key = "edab3a16d1fc4f7fa2e32357232904";
    const fetchWeatherData = async (lat: number, lng: number) => {
      const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lng}&days=3`;
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
    markers.forEach(marker => {
      fetchWeatherData(marker.lat, marker.lng);
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
    </>
    
  );
}



