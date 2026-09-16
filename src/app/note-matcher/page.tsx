"use client";

import { useState } from "react";

import { MenuComponent } from "./components/menu-component";
import { MusicNote, SoundManager } from "./services/sound-manager";

import styles from "./page.module.scss";

export default function NoteGuesserPage() {
    const [note, setNote] = useState<MusicNote>(SoundManager.getRandomNote());

    const getNextNote = () => {
        const nextNote = SoundManager.getRandomNote();
        setNote(nextNote);
    };

    const playNote = () => {
        SoundManager.playNote(note);
    };

    return (
        <>
            <main className={styles.mainWrapper}>
                <h1 className="title" style={{ marginBottom: "0.5rem" }}>
                    Note matcher
                </h1>
                <button onClick={playNote}>Play</button>
                <button onClick={getNextNote}>Next</button>
            </main>
            <MenuComponent />
        </>
    );
}
