import { useState } from 'react';
import { useWorkoutStore } from '../workout-store';

type DayFormComponentProps = {
    onCancel: () => void;
};

export const DayFormComponent = (props: DayFormComponentProps) => {
    const { addDay } = useWorkoutStore();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string>();

    const onAddDay = () => {
        if (!name.trim().length) {
            setNameError('Name required');
            return;
        } else {
            setNameError(undefined);
            addDay({ name, taskGroups: [] });
            props.onCancel();
        }
    };

    return (
        <section className="modalBackdrop">
            <div onClick={(e) => e.stopPropagation()} className="modalWrapper">
                <div className="formWrapper">
                    <h3 className="subtitle bold" style={{ marginBottom: '1rem' }}>
                        Add a new day
                    </h3>
                    <fieldset>
                        <label htmlFor="name" className="formLabel">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="formInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="formError">{nameError}</p>}
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button onClick={onAddDay} className="formBtnSubmit">
                            Add
                        </button>
                        <button onClick={() => props.onCancel()} className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
