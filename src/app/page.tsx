import Link from 'next/link';
import style from './page.module.scss';
import Image from 'next/image';

export default async function App() {
    return (
        <div>
            <main className={style.mainWrapper}>
                <div className={style.brandWrapper}>
                    <Image src="/brand/brand-256x256.png" alt="brand" width="256" height="256" />
                    <h1 className={style.brandItem}>Workout Composer</h1>
                </div>
                <Link href={'../workout-composer'} className={style.navItem}>
                    Workout Composer
                </Link>
                <Link href={'/darts-manager'} className={style.navItem}>
                    Darts Manager
                </Link>
            </main>
        </div>
    );
}
