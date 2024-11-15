import style from './confirm-modal-component.module.scss';

type ConfirmModalComponentProps = {
    text: string;
    textAlt?: string;
    onAction: (confirmReset: boolean) => void;
    onActionAlt?: (confirmReset: boolean) => void;
};

export const ConfirmModalComponent = (props: ConfirmModalComponentProps) => {
    return (
        <div className="modalBackdrop">
            <div className={`modalWrapper ${style.confirmWrapper}`}>
                <p className="title dark">{props.text}</p>
                <div className={style.btnWrapper}>
                    <button onClick={() => props.onAction(true)} type="button" className="formBtnSubmit">
                        Confirm
                    </button>
                    <button onClick={() => props.onAction(false)} type="button" className="formBtnCancel">
                        Cancel
                    </button>
                </div>

                {props.textAlt && (
                    <>
                        <p className="title dark" style={{ marginTop: '2rem' }}>
                            or
                        </p>
                        <p className="title dark">{props.textAlt}</p>
                        <div className={style.btnWrapper}>
                            <button
                                onClick={() => props.onActionAlt && props.onActionAlt(true)}
                                type="button"
                                className="formBtnSubmit">
                                Confirm
                            </button>
                            <button
                                onClick={() => props.onAction(false)}
                                type="button"
                                className="formBtnCancel">
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
