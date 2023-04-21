import { useState } from "react"
import {app} from "../../firebaseConfig"
import {auth} from "../../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {db} from "../../firebaseConfig"

export const SignIn = () => {

    const [email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    async function handleSignIn() {
        createUserWithEmailAndPassword(auth, email, Password)
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
    }

    return(
        <div>
            <h1>Sign In</h1>
            <label>
            Email:
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </label>
            <label>
                Password:
                <input value={Password} onChange={e => setPassword(e.target.value)} type="password" />
            </label>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}