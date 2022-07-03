import localStyle from "./ExerciseDetails.module.css";
import { FunctionComponent } from "react";
import { Exercise } from "./ExerciseItem";

type Props = Exercise;

const ExerciseDetails: FunctionComponent<Props> = (props: Props) => {

  return (
    <div className={localStyle.exerciseItem}>
      <h4 className={localStyle.nameLabel}>{props.name} Details</h4>
      <p>Sets: {props.sets}</p>
      <p>Reps: {props.reps}</p>
    </div>
  );
};

export default ExerciseDetails;
