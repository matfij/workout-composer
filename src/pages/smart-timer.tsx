import ActionBar from '../common/components/action-bar.component';
import CreateTimerForm from '../features/smart-timer/components/create-timer-form.component';
import TimerView from '../features/smart-timer/components/timer-view.component';

export default function SmartTimer() {
  return (
    <>
      <main className="mainWrapper">
        <h1 className="title">
          Smart Timer
        </h1>
        <CreateTimerForm />
        <TimerView />
      </main>
      <ActionBar />
    </>
  );
}
