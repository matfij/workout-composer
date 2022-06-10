import Exercise from "../components/Exercise";

const Board = (props) => {
  return (
    <div>
      <div className="wrapper-cards">
        Monday
        <Exercise name="Pull-up" sets="3" reps="5" />
        <Exercise name="Push-up" sets="3" reps="12" />
      </div>
    </div>
  );
};

export default Board;
