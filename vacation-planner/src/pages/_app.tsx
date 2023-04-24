import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect } from 'react';
import '/public/travelPic.png'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
<<<<<<< HEAD
    
    <Header />
    
    <Component {...pageProps} />
    


  </> )
=======
      <Header />
      <Component {...pageProps} />
    </> )
>>>>>>> a8cea07e30b14d6d50b31291efdc381f906358b1
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
