import '../styles/globals.css';
import '../styles/common.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { BoardDataProvider } from '../context/BoardContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BoardDataProvider>
      <Component {...pageProps} />
    </BoardDataProvider>
  );
}

export default MyApp;
