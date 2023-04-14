import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8JY0XuCZ1hSciIdGme2gz11JDJ3t5PkU",
  authDomain: "vacation-planner-df31b.firebaseapp.com",
  projectId: "vacation-planner-df31b",
  storageBucket: "vacation-planner-df31b.appspot.com",
  messagingSenderId: "488208179973",
  appId: "1:488208179973:web:30a3db873e616c639bcd6c",
  measurementId: "G-1XD5DWSZNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);