import localStyle from "./Board.module.css";
import ExerciseList from "../components/ExerciseList";
import ExerciseAdd from "../components/ExerciseAdd";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DUMMY_DATA = [
  { key: "x1", name: "Squat", sets: 5, reps: 5 },
  { key: "x2", name: "Bench Press", sets: 5, reps: 5 },
  { key: "x3", name: "Deadlift", sets: 5, reps: 5 },
];

const Board = (props) => {
  return (
    <div>
      <ExerciseAdd />

      <div className={localStyle.wrapperBoard}>
        {DAYS.map((day) => (
          <ExerciseList key={day} name={day} exercises={DUMMY_DATA} />
        ))}
      </div>
    </div>
  );
};

export default Board;
