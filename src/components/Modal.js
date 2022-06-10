import "./Modal.css";

const Modal = (props) => {

  const onRemove = () => {
    console.log('remove');
    props.onCancel();
  }

  return (
    <div>
      <div className="wrapper-modal">
        <p>Remove {props.name}?</p>
        <button onClick={onRemove} className="btn-base">
          Remove
        </button>
        <button onClick={props.onCancel} className="btn-base">
          Cancel
        </button>
      </div>
      <div className="backdrop" />
    </div>
  );
};

export default Modal;
