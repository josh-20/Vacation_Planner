import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, addDoc, getDocs, where } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db,rtdb } from "../../firebaseConfig";
import { useRouter } from "next/router";



type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}
const key = "edab3a16d1fc4f7fa2e32357232904";
export default function Planner() {

    const auth = getAuth();
    const router = useRouter();
    const {keyword} = router.query;
    const [longitude,setLongitude] = useState(0);
    const [latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [message, setMessage] = useState('');
    const [newPlannerName, setNewRoomName] = useState('');
    const [newCode, setNewCode] = useState('');
    const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=3`;


    useEffect (() => { 
          console.log(keyword)
          const watch = navigator.geolocation.watchPosition((location) => {
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
          }, (err) => {
            console.log(err);
          }, {
            enableHighAccuracy: true,
          });
          getForecast();
          return() => navigator.geolocation.clearWatch(watch);

      },[])
    async function loadChat() {
      const querySnapshot = await getDocs(
        query(
          collection(db, "chat"),
          where("creatorId", "==", auth.currentUser!.uid)
        )
      )
    }
    async function getForecast() {
        const response = fetch(forecastWeatherUrl, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await (await response).json();
        console.log(data)
    }
    
    return (
        <div>
            <div>
                Lat: {latitude}
                Lon: {longitude}
            </div>
            Planner Page!
        </div>
    )
}