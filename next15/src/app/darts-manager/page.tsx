'use client';

import style from './page.module.scss';
import { useDartsStore } from './darts-store';
import { PlayerCardComponent } from './player-card-component';
import { MenuComponent } from './menu-component';
import { useState } from 'react';
import { AddPlayerComponent } from './add-player-component';

export const dynamic = 'force-dynamic';

export default function DartsManagerPage() {
    const { players } = useDartsStore();
    const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
    const [showResetGameDialog, setShowResetGameDialog] = useState(false);
    const [showUndoScoresDialog, setShowUndoScoresDialog] = useState(false);

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 style={{ marginBottom: '1rem' }}>Game of Darts</h1>
                {players.map((player, ind) => (
                    <PlayerCardComponent player={player} key={ind} />
                ))}
            </main>
            <MenuComponent
                showAddPlayerForm={() => setShowAddPlayerForm(true)}
                showResetGameDialog={() => setShowResetGameDialog(true)}
                showUndoDialog={() => setShowUndoScoresDialog(true)}
            />
            {showAddPlayerForm && <AddPlayerComponent onCancel={() => setShowAddPlayerForm(false)} />}
        </>
    );
}
