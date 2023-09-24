import { useEffect, useState } from 'react';
import ActionBar from '../features/darts-scoreboard/components/action-bar.component';
import AddUserForm from '../features/darts-scoreboard/components/add-user-form.component';
import {
  useDartsScoreboardContext,
  useSetDartsScoreboardContext,
} from '../features/darts-scoreboard/contexts/darts-scoreboard.context';
import UserCard from '../features/darts-scoreboard/components/user-card.component';
import { loadDartsScoreboardData } from '../features/darts-scoreboard/contexts/darts-scoreboard-persist';

export default function DartsScoreboard() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const dartsScoreboard = useDartsScoreboardContext();
  const setDartsScoreboard = useSetDartsScoreboardContext();

  useEffect(() => {
    const savedData = loadDartsScoreboardData();
    if (!savedData) {
      return;
    }
    setDartsScoreboard(savedData);
  }, []);

  return (
    <>
      <main className="mainWrapper">
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Darts Scoreboard
        </h1>
        <div className="flex w-11/12 max-w-xl m-auto mt-8 items-center justify-center flex-col gap-4">
          {dartsScoreboard.users.map((user) => (
            <UserCard key={user.name} user={user} />
          ))}
        </div>
      </main>
      {showAddUserForm && <AddUserForm onCancel={() => setShowAddUserForm(false)} />}
      <ActionBar showAddUserForm={() => setShowAddUserForm(true)} />
    </>
  );
}
