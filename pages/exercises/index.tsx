import { NextPage } from "next";
import ExerciseList from "../../components/exercise/ExerciseList";

export const DUMMY_EXERCISES = [
  { name: "Pull-ups", sets: 5, reps: 10 },
  { name: "Push-ups", sets: 4, reps: 24 },
  { name: "Squats", sets: 3, reps: 8 },
];

const ExercisesPage: NextPage = () => {
  return (
    <>
      <ExerciseList exercises={DUMMY_EXERCISES} />
    </>
  );
};

export default ExercisesPage;
