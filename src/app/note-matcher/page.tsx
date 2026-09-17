"use client";

import { useEffect, useState } from "react";

import { MenuComponent } from "./components/menu-component";
import { PitchDetector } from "./services/pitch-detector";
import { MusicNote, SoundManager } from "./services/sound-manager";

import styles from "./page.module.scss";

export default function NoteGuesserPage() {
    const [pitch, setPitch] = useState(0);
    const [note, setNote] = useState<MusicNote>(SoundManager.getRandomNote());

    useEffect(() => {
        PitchDetector.start().then(() => {
            setInterval(() => {
                const newPitch = PitchDetector.getPitch();
                if (newPitch !== undefined) {
                    setPitch(newPitch);
                }
            }, 20);
        });
    }, []);

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
                <div>
                    <p>Pitch: {pitch}</p>
                </div>
                <button onClick={playNote}>Play</button>
                <button onClick={getNextNote}>Next</button>
            </main>
            <MenuComponent />
        </>
    );
}
