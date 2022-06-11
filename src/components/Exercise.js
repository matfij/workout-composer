import localStyle from './Exercise.module.css';
import { useState } from "react";
import Modal from "./Modal";
import Card from './Card';

const Exercise = (props) => {
  const [displayModal, setDisplayModal] = useState(false);

  const removeExercise = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  }

  return (
    <Card>
      <h3>{ props.name }</h3>
      <p>{ props.sets + " x " + props.reps }</p>
      <button className="btn-base">Favorite</button>
      <button onClick={removeExercise} className="btn-base">Remove</button>

      { displayModal && <Modal name={props.name} onCancel={closeModal} /> }
    </Card>
  );
};

export default Exercise;
