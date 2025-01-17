'use client';

import style from './page.module.scss';
import { MenuComponent } from './components/menu-component';
import { TreadmillCalculatorComponent } from './components/treadmill-calculator-component';

export default function CalculatorsPage() {
    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Calculators
                </h1>
                <TreadmillCalculatorComponent />
            </main>
            <MenuComponent />
        </>
    );
}
