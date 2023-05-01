import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, addDoc, getDocs, where,doc, serverTimestamp, FieldValue, getCountFromServer } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db,rtdb } from "../../firebaseConfig";
import { useRouter } from "next/router";



type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}
<<<<<<< HEAD

type Chat = {
  id: string
  name: string,
  createdBy: string,
  createdAt: FieldValue,

}
=======
const key = "edab3a16d1fc4f7fa2e32357232904";
export default function Planner() {
>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0



export default function Planner() {
    const auth = getAuth();
    const router = useRouter();
    const id = router.query!.id as string;
    const [longitude,setLongitude] = useState(0);
    const [latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [chat,setChat] = useState<Chat[]>([]);
    const [message, setMessage] = useState('');
<<<<<<< HEAD
    const [planner, setPlanner] = useState(null);
    const [chatId, setChatId] = useState('');
=======
    const [newPlannerName, setNewRoomName] = useState('');
    const [newCode, setNewCode] = useState('');
    const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=3`;

>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0

    useEffect (() => { 
          const watch = navigator.geolocation.watchPosition((location) => {
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
          }, (err) => {
            console.log(err);
          }, {
            enableHighAccuracy: true,
          });
<<<<<<< HEAD
=======
          getForecast();
          return() => navigator.geolocation.clearWatch(watch);
>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0

          async function loadchat() {
            const chats = await getDocs(
              query(
                collection(db, `planners/${id}/chat`),
                where("creatorId", "==", auth.currentUser!.uid)
              )
            );
            const chat: Chat[] = [];
            chats.forEach((doc) => {
              chat.push({...doc.data(), id: doc.id} as Chat);
            });
            setChat(chat)
            console.log(chat.length)
          }
          loadchat()
          return() => navigator.geolocation.clearWatch(watch);
      },[])
<<<<<<< HEAD

      async function createChat() {
        const coll = collection(db,`planners/${id}/chat`);
        const chatCount = await getCountFromServer(coll);
        if(chatCount.data().count < 1){
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

=======
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
    
>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0
    return (
        <div>
            <div>
                Lat: {latitude}
                Lon: {longitude}
            </div>
            <button onClick={() => {createChat()}}>Chat</button>
            Planner Page!
        </div>
    )
}