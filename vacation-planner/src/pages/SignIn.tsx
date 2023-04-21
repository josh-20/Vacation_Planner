import { useState } from "react"
import {app} from "../../firebaseConfig"
import {auth} from "../../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {db} from "../../firebaseConfig"

export const SignIn = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
        })
    }

    return(
        <div>
            <h1>Sign In</h1>
            <label>
                Email:
            </label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            <label>
                Password:
            </label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}