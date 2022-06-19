import { useEffect, useState } from "react";
import Exercise from "./Exercise";
import localStyle from "./Exercise.module.css";

const ExerciseList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-test-36f75-default-rtdb.europe-west1.firebasedatabase.app/exercises.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);

        const tempExe = [];
        for (const key in data) {
          tempExe.push({
            id: key,
            ...data[key],
          });
        }
        setExercises(tempExe);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={localStyle.wrapperList}>
      {props.day ?? "dupa"}

      {exercises.map((exercise) => (
        <Exercise
          key={exercise.name}
          name={exercise.name}
          sets={exercise.sets}
          reps={exercise.reps}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
