import Link from 'next/link';
import style from './page.module.scss';
import { auth } from '../auth';

export default async function App() {
    const session = await auth();

    return (
        <div>
            <main className={style.mainWrapper}>
                <h1 className={style.brandItem}>Workout Composer</h1>
                <Link href={'../workout-composer'} className={style.navItem}>
                    Workout Composer
                </Link>
                <Link href={'/darts-manager'} className={style.navItem}>
                    Darts Manager
                </Link>
                <Link href={'/user-section'} className={style.navItem}>
                    User Section
                </Link>
            </main>
            <aside>{session && <p>Signed as: {session?.user?.name}</p>}</aside>
        </div>
    );
}
