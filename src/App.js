import "./App.css";
import Exercise from "./components/Exercise";

function App() {
  return (
    <div className="wrapper-cards">
      Monday
      <Exercise name='Pull-up' sets='3' reps='5'/>
      <Exercise name='Push-up' sets='3' reps='12'/>
    </div>
  );
}

export default App;
