import style from './confirm-dialog.module.css';

type Props = {
  text: string;
  textAlt?: string;
  onAction: (confirmReset: boolean) => void;
  onActionAlt?: (confirmReset: boolean) => void;
};

export default function ConfirmDialog(props: Props) {
  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <p className="subtitle left dark">{props.text}</p>
        <button onClick={() => props.onAction(true)} type="button" className={style.confirmBtn}>
          Confirm
        </button>

        <button onClick={() => props.onAction(false)} type="button" className={style.cancelBtn}>
          Cancel
        </button>

        {props.textAlt && (
          <>
            <span className="subtitle left dark block">
              <p className="subtitle left dark">or</p>
              {props.textAlt}
            </span>
            <button
              onClick={() => props.onActionAlt && props.onActionAlt(true)}
              type="button"
              className={style.confirmBtn}
            >
              Confirm
            </button>
            <button onClick={() => props.onAction(false)} type="button" className={style.cancelBtn}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
