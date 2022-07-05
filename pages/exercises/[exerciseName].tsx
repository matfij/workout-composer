import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { DUMMY_EXERCISES } from ".";
import ExerciseDetails from "../../components/exercise/ExerciseDetails";
import { Exercise } from "../../components/exercise/ExerciseItem";

type Props = {
  exercise: Exercise;
}

const ExerciseDetailPage: NextPage<Props> = (props: Props) => {

  return (
    <ExerciseDetails {...props.exercise} />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsData = DUMMY_EXERCISES.map((exercise) => { return { params: { exerciseName: exercise.name } } });

  return {
    paths: pathsData,
    fallback: false,  // is the paths prop (not) exhaustive?
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const exerciseName = context.params?.exerciseName;

  const exercise =
    DUMMY_EXERCISES.find((exercise) => exercise.name === exerciseName) ||
    DUMMY_EXERCISES[0];

  return {
    props: { exercise: exercise }
  }
};

export default ExerciseDetailPage;
