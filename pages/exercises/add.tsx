import { NextPage } from "next";
import ExerciseAddForm from "../../components/exercise/ExerciseAddForm";

const ExerciseAddPage: NextPage = () => {
  return (
    <>
      <h1 className="center">Add new exercise</h1>
      <ExerciseAddForm></ExerciseAddForm>
    </>
  );
};

export default ExerciseAddPage;
