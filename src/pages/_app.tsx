import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import '../common/styles/globals.scss';
import '../common/styles/common.scss';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
