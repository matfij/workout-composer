import { NextPage } from "next";
import { useRouter } from "next/router";
import { DUMMY_EXERCISES } from ".";

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
