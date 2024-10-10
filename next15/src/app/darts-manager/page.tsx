'use client';

import { useEffect } from 'react';
import { useDartsStore } from './darts-store';
import { DartsPlayerPlace } from './types';

export const dynamic = 'force-dynamic';

export default function DartsManagerPage() {
    const { players, appendPlayer } = useDartsStore();

    useEffect(() => {
        appendPlayer({
            name: 'test',
            place: DartsPlayerPlace.None,
            scores: 501,
            startingScores: 501,
            throws: [],
        });
    }, []);

    return (
        <main>
            <h1>Darts Manager</h1>
            {players.map((p) => (
                <li key={p.name}>{p.name}</li>
            ))}
        </main>
    );
}
