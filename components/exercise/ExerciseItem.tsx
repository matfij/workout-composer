import localStyle from "./ExerciseItem.module.css";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";

export interface Exercise {
  id?: string;
  name: string;
  reps: number;
  sets: number;
}

type Props = Exercise;

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();

  const showDetails = () => {
    navigator.clipboard.writeText(props.id!);
    router.push(`/exercises/${props.id}`);
  }

  return (
    <div className={localStyle.exerciseItem}>
      <p className={localStyle.nameLabel}>{props.name}</p>
      <p>Sets: {props.sets} | Reps: {props.reps}</p>

      <button className="baseBtn" onClick={showDetails}>Details</button>
    </div>
  );
};

export default ExerciseItem;
