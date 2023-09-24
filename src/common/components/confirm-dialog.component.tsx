import style from './confirm-dialog.module.css';

type Props = {
  text: string;
  onAction: (confirmReset: boolean) => void;
};

export default function ConfirmDialog(props: Props) {
  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <p className='text-lg font-medium mb-4'>{props.text}</p>
        <button onClick={() => props.onAction(true)} type="button" className={style.confirmBtn}>
          Confirm
        </button>
        <button onClick={() => props.onAction(false)} type="button" className={style.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}
