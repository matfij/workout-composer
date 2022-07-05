import { NextPage } from "next";
import { useRouter } from "next/router";
import ExerciseAddForm from "../../components/exercise/ExerciseAddForm";
import { Exercise } from "../../components/exercise/ExerciseItem";

const ExerciseAddPage: NextPage = () => {
  const router = useRouter();

  const addExercise = async (exercise: Exercise) => {
    const res = await fetch('/api/exercise-add', {
      method: 'POST',
      body: JSON.stringify(exercise),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    router.replace('/exercises');
  };

  return (
    <>
      <h1 className="center">Add new exercise</h1>
      <ExerciseAddForm addExercise={addExercise}></ExerciseAddForm>
    </>
  );
};

export default ExerciseAddPage;
