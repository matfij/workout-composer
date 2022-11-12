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
          <Image src="/brand.png" alt="" width={160} height={160} />
        </div>

        <Link
          className="btnLink"
          href="/workout-composer"
        >
          Workout Composer
        </Link>

        <Link
          className="btnLink"
          href="/running-calculator"
        >
          Running Calculator
        </Link>
      </div>
    </>
  );
}
