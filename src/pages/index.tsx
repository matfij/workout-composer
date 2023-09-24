import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
  return (
    <>
      <Head>
        <title>Workout Composer</title>
        <meta name="description" content="Take technological control of your fitness jurney." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <div className="max-w-xl w-11/12 m-auto">
        <div className="w-40 m-auto my-12">
          <Image src="/brand.png" alt="" width={160} height={160} priority={false} />
        </div>

        <Link className="btnLink" href="/workout-composer" data-testid="workout-composer-link">
          Workout Composer
        </Link>

        <Link className="btnLink" href="/running-calculator" data-testid="running-calculator-link">
          Running Calculator
        </Link>

        <Link className="btnLink" href="/smart-timer" data-testid="smart-timer-link">
          Smart Timer
        </Link>

        <Link className="btnLink" href="/darts-scoreboard" data-testid="darts-scoreboard-link">
          Darts Scoreboard
        </Link>
      </div>
    </>
  );
}
