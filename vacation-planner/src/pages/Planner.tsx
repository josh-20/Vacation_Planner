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

type Chat = {
  id: string
  name: string,
  createdBy: string,
  createdAt: FieldValue,

}



export default function Planner() {
    const auth = getAuth();
    const router = useRouter();
    const id = router.query!.id as string;
    const [longitude,setLongitude] = useState(0);
    const[latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [chat,setChat] = useState<Chat[]>([]);
    const [message, setMessage] = useState('');
    const [planner, setPlanner] = useState(null);
    const [chatId, setChatId] = useState('');

    useEffect (() => { 
          const watch = navigator.geolocation.watchPosition((location) => {
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
          }, (err) => {
            console.log(err);
          }, {
            enableHighAccuracy: true,
          });

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

    return (
        <div>
            <div>
                Long: {longitude}
                Lat: {latitude}
            </div>
            <button onClick={() => {createChat()}}>Chat</button>
            Planner Page!
        </div>
    )
}