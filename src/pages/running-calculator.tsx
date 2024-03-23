import ActionBar from '../common/components/action-bar.component';
import RunPeaceForm from '../features/running-calculator/components/run-pace-form.component';
import RunTimeForm from '../features/running-calculator/components/run-time-form.component';

export default function RunningCalculator() {
  return (
    <>
      <main className="mainWrapper">
        <h1 className="title">
          Running Calculator
        </h1>
        <RunPeaceForm />
        <RunTimeForm />
      </main>
      <ActionBar />
    </>
  );
}
