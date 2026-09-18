"use client";

import { useEffect, useState } from "react";
import { Chart, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Scatter } from "react-chartjs-2";

import { MenuComponent } from "./components/menu-component";
import { PitchDetector } from "./services/pitch-detector";
import { MusicNote, SoundManager } from "./services/sound-manager";

import styles from "./page.module.scss";

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const DEFAULT_NOTE: MusicNote = "E3";

export default function NoteGuesserPage() {
    const [pitch, setPitch] = useState(0);
    const [note, setNote] = useState<MusicNote>(DEFAULT_NOTE);
    const [targetPitch, setTargetPitch] = useState(SoundManager.getNoteFrequency(DEFAULT_NOTE));

    useEffect(() => {
        PitchDetector.start().then(() => {
            setInterval(() => {
                setPitch(PitchDetector.getPitch());
            }, 20);
        });
    }, []);

    const getNextNote = () => {
        const nextNote = SoundManager.getRandomNote();
        setNote(nextNote);
        setTargetPitch(SoundManager.getNoteFrequency(nextNote));
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
                    <div>Pitch: {pitch}</div>
                    <div>Target: {`${note}: ${targetPitch}`}</div>
                </div>
                <Scatter
                    data={{
                        datasets: [
                            {
                                label: "Pitch",
                                data: [{ x: 0, y: pitch }, { x: 1, y: pitch }, { x: 2, y: pitch }],
                                backgroundColor: "rgba(255, 99, 132, 1)",
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: { type: "linear", position: "bottom" },
                            y: { type: "linear", position: "left" },
                        },
                        animation: false,
                    }}
                />
                <button onClick={playNote}>Play</button>
                <button onClick={getNextNote}>Next</button>
            </main>
            <MenuComponent />
        </>
    );
}
