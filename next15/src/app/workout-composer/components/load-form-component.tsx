import { useState } from 'react';
import { getWorkout } from '../actions';
import { useWorkoutStore } from '../workout-store';

type LoadFormComponentProps = {
    onCancel: () => void;
};

export const LoadFormComponent = (props: LoadFormComponentProps) => {
    const { setPlan } = useWorkoutStore();
    const [id, setId] = useState('');
    const [idError, setIdError] = useState('');

    const loadWorkout = async () => {
        setIdError('');
        if (!id) {
            setIdError('ID is required');
            return;
        }
        const workout = await getWorkout(id);
        if (!workout) {
            setIdError('Workout not found');
            return;
        }
        setPlan({
            days: workout,
            isLocked: false,
            isDragging: false,
        });
        window.history.pushState({}, document.title, `workout-composer?id=${id}`);
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
                        <button onClick={loadWorkout} className="formBtnSubmit">
                            Load
                        </button>
                        <button onClick={() => props.onCancel()} type="button" className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
