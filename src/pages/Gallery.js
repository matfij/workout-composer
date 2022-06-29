import { useContext } from "react";
import Exercise from "../components/Exercise";
import FavContext from "../store/fav-context";

const Gallery = (props) => {
  const favCtx = useContext(FavContext);

  let content;
  content = favCtx.favCount === 0 ? <h2>No favs</h2> : <h2>My favs</h2>;

  return (
    <div>
      {content}
      {favCtx.favs.map((exercise) => (
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

export default Gallery;
