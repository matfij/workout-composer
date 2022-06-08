const Exercise = (props) => {

  const removeExercise = () => {
    console.log(props.name, 'removed');
  };

  return (
    <div className="item-card">
      <h3>{ props.name }</h3>
      <p>Sets x Reps: { props.sets + ' x ' + props.reps }</p>
      <button onClick={removeExercise} className="btn-base">Remove</button>
    </div>
  );
};

export default Exercise;
