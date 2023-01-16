import ActionBar from "../features/smart-timer/components/action-bar.component";
import CreateTimerForm from "../features/smart-timer/components/create-timer-form.component";
import TimerView from "../features/smart-timer/components/timer-view.component";

export default function SmartTimer() {
  return (
    <>
      <main className="mainWrapper">
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Smart Timer
        </h1>
        <CreateTimerForm />
        <TimerView />
      </main>
      <ActionBar />
    </>
  );
}
