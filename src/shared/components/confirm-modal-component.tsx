import style from './confirm-modal-component.module.scss';

type ConfirmModalComponentProps = {
    text: string;
    textAlt?: string;
    onAction: (confirm: boolean) => void;
    onActionAlt?: (confirm: boolean) => void;
};

export const ConfirmModalComponent = (props: ConfirmModalComponentProps) => {
    const hasAltSection = props.textAlt && props.onActionAlt !== undefined;

    return (
        <div className="modalBackdrop">
            <div className={`modalWrapper ${style.confirmWrapper}`}>
                <p className="title dark">{props.text}</p>
                {!hasAltSection && <br />}
                <div className={style.btnWrapper}>
                    <button onClick={() => props.onAction(true)} type="button" className="formBtnSubmit">
                        Confirm
                    </button>
                    <button onClick={() => props.onAction(false)} type="button" className="formBtnCancel">
                        Cancel
                    </button>
                </div>
                {hasAltSection && (
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
                                onClick={() => props.onActionAlt && props.onActionAlt(false)}
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
