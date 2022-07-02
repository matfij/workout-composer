import localStyle from "./ExerciseItem.module.css";
import { FunctionComponent } from "react";

export interface Exercise {
  name: string;
  reps: number;
  sets: number;
}

type Props = Exercise;

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={localStyle.exerciseItem}>
      <p className={localStyle.nameLabel}>{props.name}</p>
      <p>Sets: {props.sets}</p>
      <p>Reps: {props.reps}</p>
    </div>
  );
};

export default ExerciseItem;
