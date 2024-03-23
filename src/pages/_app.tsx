import '../common/styles/globals.scss';
import '../common/styles/common.scss';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ExerciseBoardProvider } from '../features/workout-composer/contexts/exercise-board.context';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExerciseBoardProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ExerciseBoardProvider>
  );
}
