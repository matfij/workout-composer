"use client";

import { useEffect, useState } from "react";

import { MenuComponent } from "./components/menu-component";
import { PitchChart } from "./components/pitch-chart";
import { PitchDetector } from "./services/pitch-detector";
import { MusicNote, SoundManager } from "./services/sound-manager";

import styles from "./page.module.scss";

const DEFAULT_NOTE: MusicNote = "C4";
const PITCH_TOLERANCE = 10;

export default function NoteGuesserPage() {
    const [pitch, setPitch] = useState(0);
    const [note, setNote] = useState<MusicNote>(DEFAULT_NOTE);
    const [targetPitch, setTargetPitch] = useState(SoundManager.getNoteFrequency(DEFAULT_NOTE));

    useEffect(() => {
        PitchDetector.start().then(() => {
            setInterval(() => {
                const newPitch = PitchDetector.getPitch();
                if (newPitch !== 0 && newPitch !== 2000) {
                    setPitch(newPitch);
                }
            }, 20);
        });
    }, []);

    const getNextNote = () => {
        const nextNote = SoundManager.getRandomNote();
        setNote(nextNote);
        setTargetPitch(SoundManager.getNoteFrequency(nextNote));
        SoundManager.playNote(nextNote);
    };

    const playNote = () => {
        SoundManager.playNote(note);
    };

    return (
        <>
            <main className={styles.mainWrapper}>
                <h1 className="title" style={{ marginBottom: "1rem" }}>
                    Note matcher
                </h1>
                <PitchChart pitch={pitch} targetPitch={targetPitch} tolerance={PITCH_TOLERANCE} />
                <div className={styles.actionsWrapper}>
                    <button onClick={playNote} className={styles.actionButton}>
                        Play
                    </button>
                    <button onClick={getNextNote} className={styles.actionButton}>
                        Next
                    </button>
                </div>
            </main>
            <MenuComponent />
        </>
    );
}
