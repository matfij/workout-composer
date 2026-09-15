"use client";

import { MenuComponent } from "./components/menu-component";
import { PaceDistanceCalculator } from "./components/pace-distance-calculator";
import { TreadmillCalculatorComponent } from "./components/treadmill-calculator-component";

import style from "./page.module.scss";

export default function CalculatorsPage() {
    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: "0.5rem" }}>
                    Calculators
                </h1>
                <TreadmillCalculatorComponent />
                <PaceDistanceCalculator />
            </main>
            <MenuComponent />
        </>
    );
}
