import { useState } from "react";
import Modal from "./Modal";

const Exercise = (props) => {
  const [displayModal, setDisplayModal] = useState(false);

  const removeExercise = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  }

  return (
    <div className="item-card">
      <h3>{ props.name }</h3>
      <p>Sets x Reps: { props.sets + " x " + props.reps }</p>
      <button onClick={removeExercise} className="btn-base">Remove</button>

      { displayModal && <Modal name={props.name} onCancel={closeModal} /> }
    </div>
  );
};

export default Exercise;
