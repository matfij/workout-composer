import { NextPage } from "next";
import { useRouter } from "next/router";
import { DUMMY_EXERCISES } from ".";
import ExerciseDetails from "../../components/exercise/ExerciseDetails";

const ExerciseDetailPage: NextPage = () => {
  const router = useRouter();

  const exerciseName = router.query.exerciseName;

  const exercise =
    DUMMY_EXERCISES.find((exercise) => exercise.name === exerciseName) ||
    DUMMY_EXERCISES[0];

  return (
    <ExerciseDetails {...exercise} />
  );
};

export default ExerciseDetailPage;
