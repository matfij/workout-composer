import localStyle from "./Exercise.module.css";
import { useContext, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import FavContext from "../store/fav-context";

const Exercise = (props) => {
  const favCtx = useContext(FavContext);

  const isFav = favCtx.isFav(props.name);

  const [displayModal, setDisplayModal] = useState(false);

  const removeExercise = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  const toggleFavStatus = () => {
    if (isFav) {
      favCtx.removeFav(props.name);
    } else {
      favCtx.addFav({ name: props.name, sets: props.sets, reps: props.reps });
    }
  };

  return (
    <Card>
      <h3>{props.name}</h3>
      <p>{props.sets + " x " + props.reps}</p>
      <button onClick={toggleFavStatus} className="btn-base">
        {isFav ? "Rem Fav" : "To Fav"}
      </button>
      <button onClick={removeExercise} className="btn-base">
        Remove
      </button>

      {displayModal && <Modal name={props.name} onCancel={closeModal} />}
    </Card>
  );
};

export default Exercise;
