import { useState } from 'react';
import ActionBar from '../features/darts-scoreboard/components/action-bar.component';
import AddUserForm from '../features/darts-scoreboard/components/add-user-form.component';

export default function DartsScoreboard() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  return (
    <>
      <main className="mainWrapper">
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Darts Scoreboard
        </h1>
      </main>
      {showAddUserForm && <AddUserForm onCancel={() => setShowAddUserForm(false)} />}
      <ActionBar showAddUserForm={() => setShowAddUserForm(true)} />
    </>
  );
}
