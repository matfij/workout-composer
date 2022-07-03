import localStyle from "./ExerciseList.module.css";
import { FunctionComponent } from "react";
import ExerciseItem, { Exercise } from "./ExerciseItem";

type Props = {
  exercises: Exercise[];
};

const ExerciseList: FunctionComponent<Props> = (props: Props) => {
  return (
    <section className={localStyle.listWrapper}>
      {props.exercises.map((exercise) => (
        <ExerciseItem key={exercise.name} {...exercise} />
      ))}
    </section>
  );
};

export default ExerciseList;
