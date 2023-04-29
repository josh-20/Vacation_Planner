import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect } from 'react';
export default function App({ Component, pageProps }: AppProps) {
  const showComponent = !(typeof window !== "undefined" && (window.location.pathname === "/SignIn" || window.location.pathname === "/SignUp"));
  return (
    <>
    {showComponent && <Header />}
    <Component {...pageProps} />
    {showComponent && <Footer />}
    </> )
}

// useEffect (() => { 
//   if(navigator){
//     navigator.geolocation.getCurrentPosition((location) => {
//       console.log(location);
//     }, (err) => {
//       console.log(err);
//     }, {
//       enableHighAccuracy: true,
//     });
//   }else{

//   }
// },[])
