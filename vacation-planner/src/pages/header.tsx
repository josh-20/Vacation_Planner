import React, { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/router';
=======
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0

export default function Header() {
  const auth = getAuth();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }
  function handleHome() {
    router.push("/Home");
  }
  return (
    <>
      <div className="header-title-ctn">
        <div className="text-center header-title">TravelR</div>
      </div>
      <header>
        <nav>
          <div className="hamburger-ctn">
            <a className="cl-hamburger hamburger" id="open-sidebar" onClick={toggleSidebar}>☰</a>
          </div>
          <ul className="row nav-ctn">
<<<<<<< HEAD
            <li className="col-sm-3 text-center nav-item" onClick={handleHome}>Home</li>
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="./Planner">Planner</a></li>
=======
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="./">Home</a></li>
>>>>>>> 3e8dcda98245f64cbfb2a4cf126809b43ceea0b0
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="#services">Services</a></li>
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="#contact">Contact</a></li>
            <li className="col-sm-3 text-center nav-item" onClick={() => {signOut(auth)}}>Sign Out</li>
          </ul>
        </nav>
        <nav className={`header-sidebar ${isSidebarVisible ? 'visible' : 'not-visible'}`}>
          <a className= "cl-hamburger hamburger" id="close-sidebar" onClick={toggleSidebar}>☰</a>
          <ul className="nav-ctn">
            <li className="side-item"><a href="./" className="nav-item">Home</a></li>
            <li className="side-item"><a className="nav-item">Services</a></li>
            <li className="side-item"><a className="nav-item">Contact</a></li>
            <li className="side-item nav-item" onClick={() => {signOut(auth)}}>Sign Out</li>
            <li className="side-item"><a className="nav-item"></a></li>
          </ul>
        </nav>
        <div className={`fader ${isSidebarVisible ? 'opaque' : 'hidden'}`} onClick={toggleSidebar}></div>
      </header>
    </>
  )
}
