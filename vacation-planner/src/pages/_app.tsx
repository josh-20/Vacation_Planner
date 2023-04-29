import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect } from 'react';
export default function App({ Component, pageProps }: AppProps) {
  const showHeader = !(typeof window !== "undefined" && (window.location.pathname === "/signin" || window.location.pathname === "/signup"));
  return (
    <>
    {showHeader && <Header />}
    <Component {...pageProps} />
    {showHeader && <Footer />}
    </> )
}
