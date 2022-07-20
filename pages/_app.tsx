import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <UserProvider>
    <div className="bg-gray-900 w-screen min-h-screen py-16 px-10 mb-10">
      <div className="max-w-2xl mx-auto">
        <Navbar/>
        <Component {...pageProps} />
      </div>
    </div>
    <Footer/>
  </UserProvider>
  )
}

export default MyApp
