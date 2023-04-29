import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, addDoc, getDocs, where } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db,rtdb } from "../../firebaseConfig";



type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}

export default function Planner() {
  const auth = getAuth();
    const [longitude,setLongitude] = useState(0);
    const[latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [message, setMessage] = useState('');
    const [newPlannerName, setNewRoomName] = useState('');
    const [newCode, setNewCode] = useState('');


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
    async function loadChat() {
      const querySnapshot = await getDocs(
        query(
          collection(db, "chat"),
          where("creatorId", "==", auth.currentUser!.uid)
        )
      )
    }
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