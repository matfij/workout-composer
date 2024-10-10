import Link from 'next/link';
import style from './page.module.scss';

export default async function App() {
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
            </main>
        </div>
    );
}
