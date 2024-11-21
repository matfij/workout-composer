'use client';

import style from './page.module.scss';
import { useDartsStore } from './darts-store';
import { PlayerCardComponent } from './components/player-card-component';
import { MenuComponent } from './components/menu-component';
import { useState } from 'react';
import { AddPlayerComponent } from './components/add-player-component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal-component';

export const dynamic = 'force-dynamic';

export default function DartsManagerPage() {
    const { players, currentTurn, clearPoints, clearGame, undoAction } = useDartsStore();
    const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
    const [showClearDialog, setShowClearDialog] = useState(false);
    const [showUndoPointsDialog, setShowUndoPointsDialog] = useState(false);

    const onClearPoints = (confirm: boolean) => {
        if (confirm) {
            clearPoints();
        }
        setShowClearDialog(false);
    };

    const onClearGame = (confirm: boolean) => {
        if (confirm) {
            clearGame();
        }
        setShowClearDialog(false);
    };

    const onUndoAction = (confirm: boolean) => {
        if (confirm) {
            undoAction();
        }
        setShowUndoPointsDialog(false);
    };

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 style={{ marginBottom: '0.5rem' }}>Game of Darts</h1>
                <p className="subtitle" style={{ marginBottom: '1rem' }}>
                    Turn: {currentTurn}
                </p>
                {players.map((player, ind) => (
                    <PlayerCardComponent player={player} key={ind} />
                ))}
            </main>
            <MenuComponent
                showAddPlayerForm={() => setShowAddPlayerForm(true)}
                showResetGameDialog={() => setShowClearDialog(true)}
                showUndoDialog={() => setShowUndoPointsDialog(true)}
            />
            {showAddPlayerForm && <AddPlayerComponent onCancel={() => setShowAddPlayerForm(false)} />}
            {showClearDialog && (
                <ConfirmModalComponent
                    text={'Do you want to reset points?'}
                    textAlt={'Do you want to clear all game data?'}
                    onAction={(confirm) => onClearPoints(confirm)}
                    onActionAlt={(confirm) => onClearGame(confirm)}
                />
            )}
            {showUndoPointsDialog && (
                <ConfirmModalComponent
                    text="Do you want undo last action?"
                    onAction={(confirm) => onUndoAction(confirm)}
                />
            )}
        </>
    );
}
