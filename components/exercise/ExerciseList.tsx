import { FunctionComponent } from "react";
import ExerciseItem, { Exercise } from "./ExerciseItem";

type Props = {
  exercises: Exercise[];
};

const ExerciseList: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      {props.exercises.map((exercise) => (
        <ExerciseItem key={exercise.name} {...exercise} />
      ))}
    </>
  );
};

export default ExerciseList;
