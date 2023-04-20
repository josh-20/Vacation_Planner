import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header />
    <Component {...pageProps} />


  </> )
}
