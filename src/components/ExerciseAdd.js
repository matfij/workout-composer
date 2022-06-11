import { useRef } from "react";
import Card from "./Card";
import localStyle from "./ExerciseAdd.module.css";

const ExerciseAdd = (props) => {
  const nameInputRef = useRef();
  const setsInputRef = useRef();
  const repsInputRef = useRef();

  const addExercise = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const sets = setsInputRef.current.value;
    const reps = repsInputRef.current.value;

    console.log(name, sets, reps);
  };

  return (
    <Card>
      <h3>Add Exercise</h3>
      <form onSubmit={addExercise}>
        <label htmlFor="name">Name</label>
        <input ref={nameInputRef} type="text" required id="name" />
        <label htmlFor="sets">Sets</label>
        <input ref={setsInputRef} type="number" required id="sets" />
        <label htmlFor="reps">Reps</label>
        <input ref={repsInputRef} type="reps" required id="reps" />
        <button className="btn-base">Add</button>
      </form>
    </Card>
  );
};

export default ExerciseAdd;
