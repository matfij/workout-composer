import Exercise from "./Exercise";
import localStyle from "./Exercise.module.css";

const ExerciseList = (props) => {
  return (
    <div className={localStyle.wrapperList}>
      {props.day}

      {props.exercises.map((exercise) => (
        <Exercise key={exercise.name} name={exercise.name} sets={exercise.sets} reps={exercise.reps} />
      ))}
    </div>
  );
};

export default ExerciseList;
