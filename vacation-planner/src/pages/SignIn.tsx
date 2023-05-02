import { useState } from "react"
import {app} from "../../firebaseConfig"
import {auth} from "../../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {db} from "../../firebaseConfig"
import style from '../styles/SignIn.module.css'
import "."
import { useRouter } from "next/router";


export default function SignIn(){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password).then(() =>{
            router.push('/');
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
        })
    }

    return(
        <div className={style.centerAll}>
            <h1 id={style.signIn}>Sign In</h1>
            <div className="row">
                <div className={style.signInCtn + " text-center col-sm-12"}>
                    <div>Email</div>
                    <input className={style.email + " col-sm-12"} value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <div>Password</div>
                    <input className={style.password + " col-sm-12"} value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    <div></div>
                    <button className={style.button + " col-sm-12"} onClick={handleSignIn}>Sign In</button>
                    <button className={style.button} onClick={() => {router.push("/SignUp")}}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}