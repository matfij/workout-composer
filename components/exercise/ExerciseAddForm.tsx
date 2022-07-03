import { FunctionComponent, useRef } from "react";

const ExerciseAddForm: FunctionComponent = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const setsRef = useRef<HTMLInputElement>(null);
  const repsRef = useRef<HTMLInputElement>(null);

  const addExercise = (event: any) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const sets = setsRef.current?.value;
    const reps = repsRef.current?.value;

    console.log(name, sets, reps);
  };

  return (
    <form onSubmit={addExercise}>
      <label htmlFor="name">Name</label>
      <input ref={nameRef} type="text" required id="name" />
      <label htmlFor="sets">Sets</label>
      <input ref={setsRef} type="number" required id="sets" />
      <label htmlFor="reps">Reps</label>
      <input ref={repsRef} type="reps" required id="reps" />

      <button className="btn-base">Add</button>
    </form>
  );
};

export default ExerciseAddForm;
