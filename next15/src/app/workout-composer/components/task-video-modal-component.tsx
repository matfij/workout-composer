import style from './task-video-modal-component.module.scss';

type TaskFormComponentProps = {
    videoUrl: string;
    onCancel: () => void;
};

export const TaskVideoModalComponent = (props: TaskFormComponentProps) => {
    return (
        <div className="modalBackdrop">
            <div className="modalWrapper">
                <div>
                    <iframe src={props.videoUrl} className={style.iframeItem} allowFullScreen />
                </div>
                <button
                    onClick={() => props.onCancel()}
                    type="button"
                    className="formBtnCancel"
                    style={{ width: '100%' }}>
                    Close
                </button>
            </div>
        </div>
    );
};
