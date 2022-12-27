import ActionBar from '../features/running-calculator/components/action-bar.component';
import RunPeaceForm from '../features/running-calculator/components/run-pace-form.component';
import RunTimeForm from '../features/running-calculator/components/run-time-form.component';

export default function RunningCalculator() {
  return (
    <>
      <main className="mainWrapper">
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Running Calculator
        </h1>
        <RunPeaceForm />
        <RunTimeForm />
      </main>
      <ActionBar />
    </>
  );
}
