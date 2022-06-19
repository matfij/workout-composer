import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const ExerciseAdd = (props) => {
  const nameInputRef = useRef();
  const setsInputRef = useRef();
  const repsInputRef = useRef();

  const navi = useNavigate();

  const addExercise = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const sets = setsInputRef.current.value;
    const reps = repsInputRef.current.value;

    const baseUrl =
      "https://react-test-36f75-default-rtdb.europe-west1.firebasedatabase.app";
    const url = `${baseUrl}/exercises.json`;
    const data = JSON.stringify({ name, sets, reps });

    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navi('/gallery'));
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
