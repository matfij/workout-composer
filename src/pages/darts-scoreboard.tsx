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
  const [showResetScoresDialog, setShowResetScoresDialog] = useState(false);
  const [showClearScoresDialog, setShowClearScoresDialog] = useState(false);

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
    setShowResetScoresDialog(false);
  };

  const handleClearScoresDialogAction = (confirmClear: boolean) => {
    if (confirmClear) {
      handleSetBoard({ users: [], currentUserIndex: 0, turnsPassed: 1 });
    }
    setShowClearScoresDialog(false);
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
      {showResetScoresDialog && (
        <ConfirmDialog
          onAction={(confirmReset) => handleResetScoresDialogAction(confirmReset)}
          text={'Do you want to reset the score board data?'}
        />
      )}
      {showClearScoresDialog && (
        <ConfirmDialog
          onAction={(confirmClear) => handleClearScoresDialogAction(confirmClear)}
          text={'Do you want to clear the score board data?'}
        />
      )}
      <ActionBar
        showAddUserForm={() => setShowAddUserForm(true)}
        showResetGameDialog={() => setShowResetScoresDialog(true)}
        showClearGameDialog={() => setShowClearScoresDialog(true)}
      />
    </DartsContext.Provider>
  );
}
