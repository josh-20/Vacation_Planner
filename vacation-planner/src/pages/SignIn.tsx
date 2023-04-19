import { useState } from "react"

export const SignIn = () => {

    const [email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    async function handleSignIn() {
        //make fetch to sign in to server.
    }

    return(
        <div>
            <h1>Sign In</h1>
            <label>
                Email:
                <input/>
            </label>
            <label>
                Password:
                <input/>
            </label>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}