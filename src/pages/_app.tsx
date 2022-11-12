import '../common/styles/globals.css';
import '../common/styles/common.css';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ExerciseBoardProvider } from '../features/workout-composer/contexts/exercise-board.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExerciseBoardProvider>
      <Component {...pageProps} />
    </ExerciseBoardProvider>
  );
}
