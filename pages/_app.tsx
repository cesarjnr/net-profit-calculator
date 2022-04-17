import { AppProps } from 'next/app'

import '../styles/global.css'
import Sidebar from '../components/sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <section className="grow h-full p-5">
        <Component {...pageProps} />
      </section>
    </div>
  );
}
