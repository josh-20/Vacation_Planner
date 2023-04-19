import { useState } from "react"
import {app} from "../../firebaseConfig"
import {auth} from "../../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {db} from "../../firebaseConfig"

export const SignUp = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function handleSignIn() {
        createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <label>
                Email:
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </label>
            <label>
                Password:
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            </label>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}