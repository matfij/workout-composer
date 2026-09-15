"use client"

import { MenuComponent } from './components/menu-component';
import styles from './page.module.scss';

export default function NoteGuesserPage () {
    return (
    <>
        <main className={styles.mainWrapper}>
            <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                Note guesser
            </h1>
        </main>
        <MenuComponent />
    </>)
}