import React, { useState } from 'react';
import {getAuth, signOut} from "firebase/auth";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  const auth = getAuth();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }
  function goToContact(){
    router.push({pathname: "/contact"});
    
}
function goToHome(){
  router.push({pathname: "/"});
}
function goToServices(){
  router.push({pathname: "/Services"});
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
            <li className="col-sm-3 text-center nav-item" onClick={goToHome}>Home</li>
            <li className="col-sm-3 side-item nav-item text-center" onClick={goToServices}>Services</li>
            <li className="col-sm-3 text-center nav-item" onClick={goToContact}>Contact</li>
            <li className="col-sm-3 text-center nav-item" onClick={() => {signOut(auth)}}>Sign Out</li>
          </ul>
        </nav>
        <nav className={`header-sidebar ${isSidebarVisible ? 'visible' : 'not-visible'}`}>
          <a className= "cl-hamburger hamburger" id="close-sidebar" onClick={toggleSidebar}>☰</a>
          <ul className="nav-ctn">
            <li className="side-item" onClick={goToHome}>Home</li>
            <li className="side-item" onClick={goToServices}>Services</li>
            <li className="side-item nav-item" onClick={goToContact}>Contact</li>
            <li className="side-item nav-item" onClick={() => {signOut(auth)}}>Sign Out</li>
            <li className="side-item"><a className="nav-item"></a></li>
          </ul>
        </nav>
        <div className={`fader ${isSidebarVisible ? 'opaque' : 'hidden'}`} onClick={toggleSidebar}></div>
      </header>
    </>
  )
}
