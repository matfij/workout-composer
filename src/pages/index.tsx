import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
  return (
    <>
      <Head>
        <title>Workout Composer</title>
        <meta name="description" content="Take technological control of your fitness journey." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <div className="rootWrapper">
        <Image src="/brand.png" alt="" width={160} height={160} priority={false} />
        <hr />
        <Link className="btnLink" href="/workout-composer">
          Workout Composer
        </Link>
        <Link className="btnLink" href="/running-calculator">
          Running Calculator
        </Link>
        <Link className="btnLink" href="/smart-timer">
          Smart Timer
        </Link>
        <Link className="btnLink" href="/darts-scoreboard">
          Darts Scoreboard
        </Link>
      </div>
    </>
  );
}
