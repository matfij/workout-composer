import { useEffect, useState } from 'react';
import ActionBar from '../features/darts-scoreboard/components/action-bar.component';
import AddUserForm from '../features/darts-scoreboard/components/add-user-form.component';
import UserCard from '../features/darts-scoreboard/components/user-card.component';
import {
  loadDartsScoreboardData,
  saveDartsScoreboardData,
} from '../features/darts-scoreboard/contexts/darts-scoreboard-persist';
import ConfirmDialog from '../common/components/confirm-dialog.component';
import { DartsBoard } from '../features/darts-scoreboard/definitions';
import { DartsContext } from '../features/darts-scoreboard/contexts/darts-scoreboard.context';
import { DEFAULT_STARTING_SCORES, Place } from '../features/darts-scoreboard/definitions/constants';

export default function DartsScoreboard() {
  const [board, setBoard] = useState<DartsBoard>({ users: [], currentUserIndex: 0, turnsPassed: 1 });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showResetGameDialog, setShowResetGameDialog] = useState(false);
  const [showUndoScoresDialog, setShowUndoScoresDialog] = useState(false);

  useEffect(() => {
    const savedData = loadDartsScoreboardData();
    if (!savedData) {
      return;
    }
    handleSetBoard(savedData);
  }, []);

  const handleResetScoresDialogAction = (confirmReset: boolean) => {
    if (confirmReset && board?.users) {
      const newUsers = board.users.map((user) => ({
        ...user,
        scores: user.startingScores || DEFAULT_STARTING_SCORES,
        throws: [],
        place: Place.None,
      }));
      handleSetBoard({ users: newUsers, currentUserIndex: 0, turnsPassed: 1 });
    }
    setShowResetGameDialog(false);
  };

  const handleClearAllGameDataDialogAction = (confirmClear: boolean) => {
    if (confirmClear) {
      handleSetBoard({ users: [], currentUserIndex: 0, turnsPassed: 1 });
    }
    setShowResetGameDialog(false);
  };

  const handleUndoLastAction = (confirm: boolean) => {
    if (confirm) {
      const lastUser = board.users[board.currentUserIndex - 1];
      if (!lastUser || lastUser.throws.length < 3) {
        return;
      }
      const undoneThrows = lastUser.throws.splice(-3);
      board.currentUserIndex -= 1;
      if (board.currentUserIndex < 0) {
        board.currentUserIndex = board.users.length - 1;
      }
      lastUser.scores += undoneThrows.reduce((sum, curr) => sum + curr, 0);
      handleSetBoard(board);
    }
    setShowUndoScoresDialog(false);
  };

  const handleSetBoard = (newBoard: DartsBoard) =>
    setBoard(() => {
      saveDartsScoreboardData(newBoard);
      return newBoard;
    });

  return (
    <DartsContext.Provider value={{ board, setBoard: handleSetBoard }}>
      <main className="mainWrapper" style={{ maxWidth: '800px' }}>
        <h1 className="title">Darts Scoreboard</h1>
        <p className="subtitle" style={{ marginTop: 0 }}>
          Turn: {board.turnsPassed}
        </p>
        {board?.users.map((user) => (
          <UserCard key={user.name} user={user} />
        ))}
      </main>
      {showAddUserForm && <AddUserForm onCancel={() => setShowAddUserForm(false)} />}

      {showResetGameDialog && (
        <ConfirmDialog
          onAction={(confirm) => handleResetScoresDialogAction(confirm)}
          onActionAlt={(confirm) => handleClearAllGameDataDialogAction(confirm)}
          text={'Do you want to clear user scores?'}
          textAlt={'Do you want to clear all game data?'}
        />
      )}
      {showUndoScoresDialog && (
        <ConfirmDialog
          onAction={(confirmReset) => handleUndoLastAction(confirmReset)}
          text={'Do you want undo last action?'}
        />
      )}
      <ActionBar
        showAddUserForm={() => setShowAddUserForm(true)}
        showResetGameDialog={() => setShowResetGameDialog(true)}
        showUndoDialog={() => setShowUndoScoresDialog(true)}
      />
    </DartsContext.Provider>
  );
}
