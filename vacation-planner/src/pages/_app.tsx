import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
const MyComponent = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const showHeaderFooter = router.pathname !== "/SignIn" && router.pathname !== "/SignUp";
  
  return (
    <>
      {showHeaderFooter && <Header />}
      <Component {...pageProps} />
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default function App(props: AppProps) {
  return <MyComponent {...props}/>;
}
