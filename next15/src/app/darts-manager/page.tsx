'use client';

import style from './page.module.scss';
import { useDartsStore } from './darts-store';
import { PlayerCardComponent } from './player-card';

export const dynamic = 'force-dynamic';

export default function DartsManagerPage() {
    const { players } = useDartsStore();

    return (
        <main className={style.mainWrapper}>
            <h1 style={{ marginBottom: '1rem' }}>Game of Darts</h1>
            {players.map((player, ind) => (
                <PlayerCardComponent player={player} key={ind} />
            ))}
        </main>
    );
}
