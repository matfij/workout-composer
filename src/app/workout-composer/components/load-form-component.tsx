import { useState } from 'react';
import { getWorkout } from '../actions';
import { useWorkoutStore } from '../workout-store';
import { ToastManager } from '../../../shared/managers/toast-manager';

type LoadFormComponentProps = {
    onCancel: () => void;
};

export const LoadFormComponent = (props: LoadFormComponentProps) => {
    const { setPlan } = useWorkoutStore();
    const [id, setId] = useState('');
    const [idError, setIdError] = useState('');
    // const [rawWorkout, setRawWorkout] = useState('');
    // const [rawWorkoutError, setRawWorkoutError] = useState('');

    const loadFromCloud = async () => {
        setIdError('');
        if (!id) {
            setIdError('ID is required');
            return;
        }
        const workout = await getWorkout(id);
        if (!workout) {
            ToastManager.showError('Workout not found');
            return;
        }
        setPlan({
            days: workout,
            isLocked: true,
            isDragging: false,
        });
        window.history.pushState({}, document.title, `workout-composer?id=${id}`);
        ToastManager.showSuccess('Workout loaded');
        props.onCancel();
    };

    return (
        <section className="modalBackdrop">
            <div onClick={(e) => e.stopPropagation()} className="modalWrapper">
                <div className="formWrapper">
                    <h3 className="subtitle bold" style={{ marginBottom: '1rem' }}>
                        Load Workout
                    </h3>
                    <fieldset>
                        <label className="formLabel" htmlFor="id">
                            ID
                        </label>
                        <input
                            id="id"
                            value={id}
                            className="formInput"
                            onChange={(e) => setId(e.target.value)}
                        />
                        {idError && <p className="formError">{idError}</p>}
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button onClick={loadFromCloud} className="formBtnSubmit">
                            Load
                        </button>
                        <button onClick={() => props.onCancel()} type="button" className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                    {/* <fieldset>
                        <label className="formLabel" htmlFor="id">
                            Workout data
                        </label>
                        <textarea
                            className="formInput"
                            value={rawWorkout}
                            onChange={(e) => setRawWorkout(e.target.value)}
                        />
                        {rawWorkoutError && <p className="formError">{rawWorkoutError}</p>}
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button
                            onClick={loadFromText}
                            // disabled={}
                            type="button"
                            className="formBtnSubmit">
                            Load from text
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
};
