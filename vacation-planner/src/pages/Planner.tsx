import { watch } from "fs";
import { useState,useEffect } from "react"
import { Auth, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { query, collection, getDoc, addDoc, updateDoc, getDocs, where, doc, serverTimestamp, FieldValue, getCountFromServer, AggregateField } from "firebase/firestore";
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
  createdAt: FieldValue
}
const key = "edab3a16d1fc4f7fa2e32357232904";

export default function Planner() {
    const auth = getAuth();
    const router = useRouter();
    const id = router.query!.id as string;
    const [showChatBox, setShowChatBox] = useState(false);
    const [longitude,setLongitude] = useState(0);
    const [latitude,setLatitude] = useState(0);
    const [messages, setMessages] = useState<Message []>([]);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState<Chat []>([])
    const [chatId, setChatId] = useState('');
    const [chatRoomId, setChatRoomId] = useState('');
    const [chatCount, setChatCount] = useState(0);
    const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=3`;

    function toggleChatBox() {
      setShowChatBox(!showChatBox);
    }

    useEffect(() => {
        if (chatCount > 0) {
          getChat()
        }
    })

    useEffect(() =>{
      setMessages([]);
      const roomRef = ref(rtdb, `/messages/${chatId}`)
      const unsubcribe = onChildAdded(roomRef, (data) => {
        console.log("Message received");
        const message: Message = {...data.val(), id: data.key};
        setMessages((m) => [message, ...m]);
        console.log(messages);
      });
      
      return unsubcribe;
    },[chatId])

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

    async function getChat() {
        const planner = doc(db, "planners", id)
        const docSnap = await getDoc(planner)
        const data = docSnap.data()
        setChatId(data!.chatId)
    }

    async function createChat() {
      if(chatCount < 1){
        const chatRef = collection(db, `planners/${id}/chat`);
          const chatRoom = {
              name: auth.currentUser!.email,
              createdBy: auth.currentUser!.uid,
              createdAt: serverTimestamp()
          }

          const docRef = await addDoc(chatRef, chatRoom);
          (chatRoom as Chat).id = docRef.id;
          setChatId(docRef.id);

          const planner = doc(db, "planners", id)
          const docSnap = await getDoc(planner)
          await updateDoc(planner, {
            chatId: docRef.id
          })

          const coll = collection(db,`planners/${id}/chat`);
          const chatData = await getCountFromServer(coll);
          setChatCount(chatData.data().count);
        }  
      }

    async function sendMessage() {
      if(!chatId) return;
      if(message.length < 1) return;
      const roomRef = ref(rtdb, `/messages/${chatId}`)
      const newMessageRef = push(roomRef);
      set(newMessageRef, {
        authorId: auth.currentUser!.uid,
        authorEmail: auth.currentUser!.email,
        content: message,
    });
      setMessage(''); 
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
    function handleCreateChatClick() {
      createChat();
      toggleChatBox();
    }
    
    return (
        <div className={style.container}>
            <div className={style.chatBoxCtn}>
              {chatCount > 0 && showChatBox &&
              <div className={style.chatBox}>
                {messages.slice().reverse().map((message) => (
                  <div className={style.messages} key={message.id}>
                    <div>
                      <div className={style.authorEmail}>
                        <b>{message.authorEmail}</b>
                      </div>
                      <div className={style.messageContent}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))
                }
                <div className="row">
                <input className={style.chatInput + " col-sm-9"} onChange={e => setMessage(e.target.value)} value={message}/>
                <button className={style.chatButton} onClick={sendMessage}>Send</button>
                </div>
              </div>
              }
            </div>
              <button className={style.createChatButton + " text-center"} onClick={() => {handleCreateChatClick()}}>Chat </button>
        </div>
    )
}