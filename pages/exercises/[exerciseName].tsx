import { NextPage } from "next";
import { useRouter } from "next/router";

const DUMMY_EXERCISES = [{ name: "Pull-ups", sets: 5, reps: 10 }];

const ExerciseDetailPage: NextPage = () => {
  const router = useRouter();

  const exerciseName = router.query.exerciseName;

  const exercise =
    DUMMY_EXERCISES.find((exercise) => exercise.name === exerciseName) ||
    DUMMY_EXERCISES[0];

  return (
    <>
      <h1>{exercise.name} Details</h1>
      <p>Sets: {exercise.sets}</p>
      <p>Reps: {exercise.reps}</p>
    </>
  );
};

export default ExerciseDetailPage;
