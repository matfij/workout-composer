"use client";

import { useEffect, useRef, useState } from "react";

import { MenuComponent } from "./components/menu-component";
import { PitchChart } from "./components/pitch-chart";
import { noteMatcherConfig } from "./config";
import { PitchDetector } from "./services/pitch-detector";
import { MusicNote, SoundManager } from "./services/sound-manager";

import styles from "./page.module.scss";

export default function NoteGuesserPage() {
    const [pitch, setPitch] = useState(0);
    const [note, setNote] = useState<MusicNote>(noteMatcherConfig.defaultNote);
    const [targetPitch, setTargetPitch] = useState(
        SoundManager.getNoteFrequency(noteMatcherConfig.defaultNote),
    );
    const [pitchMatch, setPitchMatch] = useState(0);
    const [showNote, setShowNote] = useState(false);
    const targetPitchRef = useRef(targetPitch);

    useEffect(() => {
        targetPitchRef.current = targetPitch;
    }, [targetPitch]);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined;
        let cancelled = false;

        PitchDetector.start().then(() => {
            if (cancelled) {
                return;
            }
            intervalId = setInterval(() => {
                const newPitch = PitchDetector.getPitch();
                if (
                    newPitch !== noteMatcherConfig.minPitch &&
                    newPitch !== noteMatcherConfig.maxPitch
                ) {
                    setPitch(newPitch);
                }
                const withinTolerance =
                    Math.abs(newPitch - targetPitch) <
                    noteMatcherConfig.pitchTolerance * targetPitch;
                setPitchMatch((prev) => (withinTolerance ? prev + 1 : Math.max(0, prev - 0.2)));
            }, noteMatcherConfig.pitchDetectionIntervalMs);
        });

        return () => {
            cancelled = true;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [targetPitch]);

    useEffect(() => {
        if (pitchMatch >= noteMatcherConfig.requiredPitchStability) {
            setShowNote(true);
            setPitchMatch(0);
        }
    }, [pitchMatch]);

    const getNextNote = () => {
        const nextNote = SoundManager.getRandomNote();
        setNote(nextNote);
        setTargetPitch(SoundManager.getNoteFrequency(nextNote));
        SoundManager.playNote(nextNote);
        setPitch(0);
        setPitchMatch(0);
        setShowNote(false);
    };

    const playNote = () => {
        SoundManager.playNote(note);
    };

    return (
        <>
            <main className={styles.mainWrapper}>
                <h1 className="title" style={{ marginBottom: "1rem" }}>
                    Note matcher {pitchMatch}
                </h1>
                {showNote && (
                    <div className={styles.noteWrapper}>
                        <p>{note}</p>
                        <b>{targetPitch} Hz</b>
                    </div>
                )}
                <PitchChart pitch={pitch} targetPitch={targetPitch} />
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
