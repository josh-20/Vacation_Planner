import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect } from 'react';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
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
