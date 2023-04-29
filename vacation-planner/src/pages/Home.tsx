<<<<<<< HEAD
import { useState ,useEffect } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { addDoc,collection, getDocs, query, where } from "firebase/firestore";
import { db,rtdb } from "../../firebaseConfig";
import "./SignIn";
import "./Home";

type Planner = {
    id: string,
    creatorId: string,
    code: string,
    name: string
  }

export default function Home() {
    const auth = getAuth();
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const  [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [newCode, setCode] = useState('');
    const [newPlannerName, setNewPlannerName] = useState('');
    const[planners, setPlanners] = useState<Planner[]>([])


    useEffect(() => {
        async function loadPlans() {

            try {
                const querySnapshot = await getDocs(query(collection(db,"planners"), where("creatorId", "==", auth.currentUser!.uid)));
                console.log(querySnapshot);
            } catch (error) {
                console.error(error);
            }
            // const myplans: Planner[] = [];
            // querySnapshot.forEach((doc) => {
            //     myplans.push({...doc.data(), id: doc.id} as Planner);
            // });
            // setPlanners(myplans);
        };
    },[])
    console.log(planners);
    async function handleCreatePlan() {
        if(!newCode || !newPlannerName){
            return;
          }
          const planner = {
            name: newPlannerName,
            code: newCode,
            creatorId: auth.currentUser!.uid,
          }
           // adding doc for planner. Still need to add A chat room for each planner.
        const docRef = await addDoc(collection(db, "planners"), planner);
        (planner as Planner).id = docRef.id;
        setPlanners([...planners, planner as Planner]);
    }

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
            <input onChange={e=>setNewPlannerName(e.target.value)}/>
            <button value="id" onClick={handleCreatePlan}>Create Plan</button>

            {
                planners.map((planner) =>(
                    <div key={planner.id}>
                        <div>{planner.name}</div>
                    </div>
                ))
            }

=======
export default function Home() {
    return(
        <div>
            Home Page!
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            
>>>>>>> 57d8f0ea63ec518c56b422a6234e294e45950c31
        </div>
        
    )
}