import { useForm } from 'react-hook-form';
import { Task } from '../types';
import { useEffect } from 'react';

type TaskFormComponentProps = {
    task?: Task;
    onAddDay: () => void;
    onCancel: () => void;
};

export const TaskFormComponent = (props: TaskFormComponentProps) => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Task>({
        defaultValues: {
            id: props.task?.id,
            name: props.task?.name,
            reps: props.task?.reps,
            sets: props.task?.sets,
            description: props.task?.description,
        },
    });

    const isEditMode = props.task !== undefined;

    const onSubmit = () => {};

    return (
        <section className="modalBackdrop">
            <div onClick={(e) => e.stopPropagation()} className="modalWrapper">
                <form onSubmit={handleSubmit(onSubmit)} className="formWrapper">
                    <h3 className="subtitle left dark" style={{ marginBottom: '1rem' }}>
                        {isEditMode ? 'Edit exercise' : 'Add a new exercise'}
                    </h3>
                    <fieldset>
                        <label className="formLabel" htmlFor="name">
                            Name
                        </label>
                        <input {...register('name', { required: true })} id="name" className="formInput" />
                        {errors.name && <p className="formError">Name is required</p>}
                    </fieldset>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <fieldset>
                            <label className="formLabel" htmlFor="sets">
                                Sets
                            </label>
                            <input {...register('sets')} id="sets" className="formInput" />
                        </fieldset>
                        <fieldset>
                            <label className="formLabel" htmlFor="reps">
                                Reps
                            </label>
                            <input {...register('reps')} id="reps" className="formInput" />
                        </fieldset>
                    </div>
                    <fieldset>
                        <label className="formLabel" htmlFor="description">
                            Description
                        </label>
                        <input
                            {...register('description')}
                            id="description"
                            className="formInput"
                            type="text"
                        />
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button className="formBtnSubmit">{isEditMode ? 'Update' : 'Add'}</button>
                        <button onClick={() => props.onCancel()} type="button" className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
