import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, addDoc, getDocs, where } from "firebase/firestore";
import {ref, onChildAdded, push, set} from "firebase/database";
import { db } from "../../firebaseConfig";



type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}
// planner adapt
type Planner = {
  id: string,
  creatorId: string,
  code: string,
  name: string
}

export default function Planner() {
  const auth = getAuth();
    const [longitude,setLongitude] = useState(0);
    const[latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [room, setRoom] = useState<Planner>();
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

    useEffect (() => {
      async function loadChat() {
        if(!newCode || !newPlannerName){
          return;
        }
        const planner = {
          name: newPlannerName,
          code: newCode,
          creatorId: auth.currentUser!.uid,
        }
        // adding doc of planner. still need to 
        const docRef = await addDoc(collection(db, "planner"), planner);
        (planner as Planner).id = docRef.id;
        setRoom(planner as Planner);
      }

    },[]);
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