import localStyle from "./ExerciseItem.module.css";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";

export interface Exercise {
  name: string;
  reps: number;
  sets: number;
}

type Props = Exercise;

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();

  const showDetails = () => {
    router.push(`/exercises/${props.name}`);
  }

  return (
    <div className={localStyle.exerciseItem}>
      <p className={localStyle.nameLabel}>{props.name}</p>
      <p>Sets: {props.sets}</p>
      <p>Reps: {props.reps}</p>

      <button onClick={showDetails}>Details</button>
    </div>
  );
};

export default ExerciseItem;
