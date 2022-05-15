import { AppProps } from 'next/app'

import '../styles/global.css'
import Sidebar from '../components/sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-w-full min-h-full flex">
      <Sidebar />
      <section className="w-full p-5">
        <Component {...pageProps} />
      </section>
    </div>
  );
}
