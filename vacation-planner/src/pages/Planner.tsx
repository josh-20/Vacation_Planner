import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, addDoc, getDocs, where,doc, serverTimestamp, FieldValue, getCountFromServer, AggregateField } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db,rtdb } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { count } from "console";
import  style  from "../styles/planner.module.css";



type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}

type Chat = {
  id: string
  name: string,
  createdBy: string,
  createdAt: FieldValue,

}
const key = "edab3a16d1fc4f7fa2e32357232904";

export default function Planner() {
    const auth = getAuth();
    const router = useRouter();
    const id = router.query!.id as string;
    const [longitude,setLongitude] = useState(0);
    const [latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [message, setMessage] = useState('');
    const [planner, setPlanner] = useState(null);
    const [chatId, setChatId] = useState('');
    const [chatCount, setChatCount] = useState(0);
    const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=3`;


    useEffect (() => {
      async function loadCount(){
        const coll = collection(db,`planners/${id}/chat`);
        const chatData = await getCountFromServer(coll);
        setChatCount(chatData.data().count);
      }
      loadCount(); 
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

      async function createChat() {
        if(chatCount < 1){
          const chatRef = collection(db, `planners/${id}/chat`);
            const chatRoom = {
                name: auth.currentUser!.email,
                createdBy: auth.currentUser!.uid,
                createdAt: serverTimestamp(),
            }
            const docRef = await addDoc(chatRef, chatRoom);
            (chatRoom as Chat).id = docRef.id;
            setChatId(docRef.id);
        }  
      }
      async function sendMessage() {
        
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
            {chatCount > 0 &&
            <div className={style.chatBox}>
              <input onChange={e => setMessage(e.target.value)}/>
              <button onClick={sendMessage}>Send</button>
            </div>
            }
            <button onClick={() => {createChat()}}>Chat</button>
        </div>
    )
}