import { useState ,useEffect, useContext } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { addDoc, getDoc, getDocs, query, where,doc, deleteDoc, updateDoc, deleteField, collection } from "firebase/firestore";
import { db,rtdb } from "../../firebaseConfig";
import "./SignIn";
import ".";
import style from '../styles/planner.module.css';
import {ref, onChildAdded, push, set, onChildRemoved, remove, child} from "firebase/database";
import { firestore } from "firebase-admin";

type Planner = {
    id: string,
    creatorId: string,
    code: string,
    name: string,
    chatId: string
  }
type JoinPlan = {
    id: string,
    creatorId: string,
    name: string,
    code: string,
    parentId: string
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
    const [joinedPlanners,setJoinedPlanners] = useState<JoinPlan[]>([]);
    useEffect(() => {
        async function loadPlans() {
            try {
                const data = await getDocs(query(collection(db, "planners"), where("creatorId", "==", auth.currentUser?.uid)))
                const joinData = await getDocs(query(collection(db, "joinPlan"), where("creatorId", "==", auth.currentUser?.uid)));
                const myJoined: JoinPlan[] = [];
                const myplans: Planner[] = [];
                joinData.forEach((doc) =>{
                    myJoined.push({...doc.data(), id: doc.id} as JoinPlan);
                })
                setJoinedPlanners(myJoined);
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
        setCode('');
        setNewPlannerName('');
    }
    // view planner selected.
    function handleViewPlan(plannerId: string){
        router.push({pathname: "/Planner", query: {id: plannerId}});
    }
    // View a joined plan
    async function handleViewJoin(parentId: string) {
        router.push({pathname: "/Planner", query: {id: parentId}})
    }
    //delete joinedPlan
    async function handleDeleteJoin(planId: string) {
        await deleteDoc(doc(db, "joinPlan", planId));
        setJoinedPlanners((current) => current.filter((planner) => planner.id !=planId))
    }

    // join a plan 
    async function handleJoinPlan() {
        if(!newCode || !newPlannerName) {
            return;
        }
        try {
            let ParentId = "";
            let creatorId = "";
            const dataSnap = await getDocs(query(collection(db, "planners"), where("name", "==", newPlannerName), where("code", "==", newCode)));
            dataSnap.forEach((doc) => {
                ParentId = doc.id;
                creatorId = doc.data().creatorId;
            });
            if (auth.currentUser?.uid == creatorId){
                return;
            }
            const joinPlan = {
                name: newPlannerName,
                code: newCode,
                creatorId: auth.currentUser?.uid,
                parentId: ParentId
            }
            const joinRef = await addDoc(collection(db,"joinPlan"), joinPlan);
            (joinPlan as JoinPlan).id = joinRef.id;

            setJoinedPlanners([...joinedPlanners, joinPlan as JoinPlan]);
            setCode('');
            setNewPlannerName('');
        } catch (error) {
            console.error(error);
        }
           // adding doc for planner. Still need to add A chat room for each planner.
    }



    async function handleDelete(id: string) {
        await deleteDoc(doc(db, "planners", id));
        setPlanners((current) => current.filter((planner) => planner.id != id))
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
                                <div className="col-sm-6 text-center">
                                    <button className={style.planButton}  onClick={() =>{handleViewPlan(planner.id)}}>View</button>
                                    <button className={style.planButton} onClick={() =>{handleDelete(planner.id), planner.chatId}}>Delete</button>
                                </div>
                                <div className={"col-sm-12 " + style.underline}></div>
                            </div>
                        </div>
                    ))
                }
                <h2 className={style.planHeader + " col-sm-12 text-center"}>Joined List</h2>
                {
                    joinedPlanners.map((plans) => (
                        <div key={plans.id}>
                            <div className="row">
                                <div className={style.planName + " col-sm-6 text-center"}>{plans.name}</div>
                                <div className="col-sm-6 text-center">
                                    <button className={style.planButton}  onClick={() =>{handleViewJoin(plans.parentId)}}>View</button>
                                    <button className={style.planButton} onClick={() =>{handleDeleteJoin(plans.id)}}>Delete</button>
                                </div>
                                <div className={"col-sm-12 " + style.underline}></div>
                            </div>
                        </div>
                    ))
                }
                <div className={"text-center " + style.createPlanCtn}>
                    <div className={style.planName}></div>
                    <div className={style.planName}> Plan Name</div>
                    <input className={"text-left " + style.planInput} onChange={e=>setNewPlannerName(e.target.value)} value={newPlannerName}/>
                    <div className={style.planName}> Room Code</div>
                    <input className={"text-left " + style.planInput} onChange={e=>setCode(e.target.value)} value={newCode}/>
                    <div>
                        <button className={"text-center " + style.planButton} value="id" onClick={handleCreatePlan}>Create Plan</button>
                        <button className={style.planButton} onClick={handleJoinPlan}>Join</button>
                    </div>
                </div>
            </div>
        </div>
 
    )
}