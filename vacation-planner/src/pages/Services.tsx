import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import style from "../styles/services.module.css";
export default function Services() {
    const auth = getAuth();
    return (
        <>
            <div className={style.ctn + " text-center"}>
                <h1 className={style.title}>WE DO STUFF!</h1>
            </div>
        </>
    )
}