import { useMemo } from 'react';
import style from './task-video-modal-component.module.scss';

type TaskFormComponentProps = {
    videoUrl: string;
    onCancel: () => void;
    options?: {
        autoplay?: boolean;
        loop?: boolean;
    };
};

export const TaskVideoModalComponent = (props: TaskFormComponentProps) => {
    const url = useMemo(() => {
        let url = props.videoUrl;
        if (props.options?.autoplay) {
            url += `&autoplay=1`;
        }
        if (props.options?.loop) {
            url += `&loop=1`;
        }
        return url;
    }, []);

    return (
        <div className="modalBackdrop">
            <div className="modalWrapper">
                <div>
                    <iframe src={url} className={style.iframeItem} allowFullScreen />
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
