import localStyle from "./ExerciseAddForm.module.css";
import { FunctionComponent, useRef } from "react";
import { Exercise } from "./ExerciseItem";

type Props = {
  addExercise: (exercise: Exercise) => void,
}

const ExerciseAddForm: FunctionComponent<Props> = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const setsRef = useRef<HTMLInputElement>(null);
  const repsRef = useRef<HTMLInputElement>(null);

  const addExercise = (event: any) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const sets = +(setsRef.current?.value || 0);
    const reps = +(repsRef.current?.value || 0);

    // todo - validation
    const exercise: Exercise = {
      name: name!,
      sets: sets!,
      reps: reps!,
    };

    props.addExercise(exercise);
  };

  return (
    <form onSubmit={addExercise} className={localStyle.exerciseForm}>
      <label htmlFor="name">Name</label>
      <input ref={nameRef} type="text" required id="name" />
      <label htmlFor="sets">Sets</label>
      <input ref={setsRef} type="number" required id="sets" />
      <label htmlFor="reps">Reps</label>
      <input ref={repsRef} type="reps" required id="reps" />

      <button className="baseBtn mt-20">Add</button>
    </form>
  );
};

export default ExerciseAddForm;
