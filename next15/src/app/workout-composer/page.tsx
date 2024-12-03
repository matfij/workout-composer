'use client';

import style from './page.module.scss';
import { useState } from 'react';
import { MenuComponent } from './components/menu-component';
import { TaskFormComponent } from './components/task-form-component';

export default function WorkoutComposerPage() {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showDayForm, setShowDayForm] = useState(false);

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Workout Composer
                </h1>
            </main>
            <MenuComponent showAddForm={() => setShowTaskForm(true)} />
            {showTaskForm && (
                <TaskFormComponent
                    onAddDay={() => setShowDayForm(true)}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </>
    );
}
