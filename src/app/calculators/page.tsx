'use client';

import style from './page.module.scss';
import { MenuComponent } from './components/menu-component';

export default function CalculatorsPage() {
    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Calculators
                </h1>
                <p className="subtitle" style={{ marginBottom: '1rem' }}>
                    Coming soon...
                </p>
            </main>
            <MenuComponent />
        </>
    );
}
