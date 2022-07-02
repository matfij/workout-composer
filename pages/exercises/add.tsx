import { NextPage } from "next";
import ExerciseAddForm from "../../components/ExerciseAddForm";

const ExerciseAddPage: NextPage = () => {
  return (
    <>
      <h1>Add new exercise</h1>
      <ExerciseAddForm></ExerciseAddForm>
    </>
  );
};

export default ExerciseAddPage;
