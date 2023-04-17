import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState,useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect (() => { 
    if(navigator){
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);
      }, (err) => {
        console.log(err);
      }, {
        enableHighAccuracy: true,
      });
    }else{
  
    }
  },[])
  return <Component {...pageProps} />
}
