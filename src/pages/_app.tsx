import '../common/styles/globals.css';
import '../common/styles/common.css';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ExerciseBoardProvider } from '../features/workout-composer/contexts/exercise-board.context';
import { DartsScoreboardProvider } from '../features/darts-scoreboard/contexts/darts-scoreboard.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExerciseBoardProvider>
      <DartsScoreboardProvider>
        <Component {...pageProps} />
      </DartsScoreboardProvider>
    </ExerciseBoardProvider>
  );
}
