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
type Room = {
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
    const [room, setRoom] = useState<Room>();
    const [message, setMessage] = useState('');
    const [newRoomName, setNewRoomName] = useState('');
    const [newCode, setNewCode] = useState('');



    function joinRoom(room: Room){

    }

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
      
      async function createChat() {
        if(!newCode || !newRoomName){
          return;
        }
        const room = {
          name: newRoomName,
          code: newCode,
          creatorId: auth.currentUser!.uid,
        }
        const docRef = await addDoc(collection(db, "planner"), room);
        (room as Room).id = docRef.id;
        setRoom(room as Room);
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