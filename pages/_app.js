// import Footer from '../components/Footer';
import '../styles/globals.css'
import "../styles/index.css"
import { RecoilRoot, useRecoilState } from 'recoil'
import { useEffect } from "react";
//
function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    // check for notifications permissions and request if not granted
    try {
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    } catch (error) {
      alert(error.message)
    }
  }, [])
  return <>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </>
}

export default MyApp