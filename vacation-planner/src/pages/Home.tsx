import { useState ,useEffect } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import "./SignIn";
import "./Home";

export default function Home() {
    const auth = getAuth();
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const  [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (user) =>{
            console.log(user);
            if(user === null){
               router.push("/SignIn")
            }
        })

        return checkAuth;

    },[loggedIn,loading])

    return(
        <div>
            Home Page!
            <button onClick={() => {signOut(auth)}}>signOut</button>
        </div>
    )
}