import localStyle from "./Board.module.css";
import ExerciseList from "../components/ExerciseList";
import ExerciseAdd from "../components/ExerciseAdd";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Board = (props) => {
  return (
    <div>
      <ExerciseAdd />
      <div className={localStyle.wrapperBoard}>
        {DAYS.map((day) => (
          <ExerciseList key={day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Board;
