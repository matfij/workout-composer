import { useState } from 'react';
import ActionBar from '../features/darts-scoreboard/components/action-bar.component';
import AddUserForm from '../features/darts-scoreboard/components/add-user-form.component';
import {
  DartsScoreboardProvider,
  useDartsScoreboardContext,
} from '../features/darts-scoreboard/contexts/darts-scoreboard.context';

export default function DartsScoreboard() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const dartsScoreboard = useDartsScoreboardContext();

  return (
    <main>
      <main className="mainWrapper">
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Darts Scoreboard
        </h1>
        {dartsScoreboard.users.map((user) => (
          <p key={user.name}>{user.name}</p>
        ))}
      </main>
      {showAddUserForm && <AddUserForm onCancel={() => setShowAddUserForm(false)} />}
      <ActionBar showAddUserForm={() => setShowAddUserForm(true)} />
    </main>
  );
}
