import { useState ,useEffect, useContext } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { addDoc,collection, getDocs, query, where } from "firebase/firestore";
import { db,rtdb } from "../../firebaseConfig";
import "./SignIn";
import ".";
import style from '../styles/planner.module.css';

type Planner = {
    id: string,
    creatorId: string,
    code: string,
    name: string,
    chatId: string
  }

export default function Home() {
    const auth = getAuth();
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [newCode, setCode] = useState('');
    const [newPlannerName, setNewPlannerName] = useState('');
    const [planners, setPlanners] = useState<Planner[]>([])

    const plannerCollectionRef = collection(db, "planners");
    useEffect(() => {
        async function loadPlans() {
            try {
                const data = await getDocs(query(collection(db, "planners"), where("creatorId", "==", auth.currentUser?.uid)))
                const myplans: Planner[] = [];
                data.forEach((doc) => {
                    myplans.push({...doc.data(), id: doc.id} as Planner);
                });
                setPlanners(myplans);
            } catch (error) {
                console.error(error);
            }
        };
        loadPlans();
    },[])

    // Create the base plan
    async function handleCreatePlan() {
        if(!newCode || !newPlannerName){
            return;
          }
          const planner = {
            name: newPlannerName,
            code: newCode,
            creatorId: auth.currentUser!.uid,
            chatId: ""
          }
           // adding doc for planner. Still need to add A chat room for each planner.
        const docRef = await addDoc(collection(db, "planners"), planner);
        (planner as Planner).id = docRef.id;
        setPlanners([...planners, planner as Planner]);
    }
    // view planner selected.
    function handleViewPlan(plannerId: string){
        router.push({pathname: "/Planner", query: {id: plannerId}});
    }

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (user) =>{
            console.log(user);
            setUser(user);
            if(user === null){
               router.push("/SignIn")
            }
        })

        return checkAuth;

    },[loggedIn,loading])

    return(
        <div> 
            <div className={style.planCtn}>
                <h2 className={style.planHeader + " col-sm-12 text-center"}>Plan List</h2>
                {
                    planners.map((planner) =>(
                        <div key={planner.id}>
                            <div className="row">
                                <div className={style.planName + " col-sm-6 text-center"}>{planner.name}</div>
                                <button className={style.planButton + " col-sm-6 text-center"}  onClick={() =>{handleViewPlan(planner.id)}}>View</button>
                                <div className={"col-sm-12 " + style.underline}></div>
                            </div>
                        </div>
                    ))
                }
                <div className={"text-center " + style.createPlanCtn}>
                    <div className={style.planName}></div>
                    <div className={style.planName}> Plan Name</div>
                    <input className={"text-left " + style.planInput} onChange={e=>setNewPlannerName(e.target.value)}/>
                    <div className={style.planName}> Room Code</div>
                    <input className={"text-left " + style.planInput} onChange={e=>setCode(e.target.value)}/>
                    <div>
                        <button className={"text-center " + style.planButton} value="id" onClick={handleCreatePlan}>Create Plan</button>
                    </div>
                </div>
            </div>
        </div>
 
    )
}