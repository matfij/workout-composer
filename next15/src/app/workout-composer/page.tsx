'use client';

import style from './page.module.scss';
import { useState } from 'react';
import { MenuComponent } from './components/menu-component';

export default function WorkoutComposerPage() {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Workout Composer
                </h1>
            </main>
            <MenuComponent showAddForm={() => setShowAddForm(true)} />
        </>
    );
}
