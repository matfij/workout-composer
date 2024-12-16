import { useState } from 'react';
import { ToastManager } from '../../../shared/managers/toast-manager';
import { saveWorkout } from '../actions';
import { useWorkoutStore } from '../workout-store';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

type ShareModalComponentProps = {
    onCancel: () => void;
};

type ShareForm = {
    id?: string;
    secret: string;
};

export const ShareModalComponent = (props: ShareModalComponentProps) => {
    const { days } = useWorkoutStore();
    const [searchParams] = useSearchParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShareForm>({
        defaultValues: {
            id: (searchParams ?? [])[1] ?? '',
        },
    });
    const [shareLoading, setShareLoading] = useState(false);

    const onShare = async (data: ShareForm) => {
        if (!data.secret) {
            return;
        }
        try {
            setShareLoading(true);
            const workoutId = await saveWorkout({ id: data.id, secret: data.secret, days });
            window.history.pushState({}, document.title, '/');
            navigator.clipboard.writeText(`${window.location.href}workout-composer?id=${workoutId}`);
            window.history.pushState({}, document.title, `workout-composer?id=${workoutId}`);
            ToastManager.showInfo('💫 Workout link copied!');
            props.onCancel();
        } catch (err) {
            ToastManager.showError(`Failed to save workout: ${err}`);
            setShareLoading(false);
        }
    };

    return (
        <div className="modalBackdrop">
            <div className="modalWrapper">
                <form onSubmit={handleSubmit(onShare)} className="formWrapper">
                    <h3 className="subtitle bold" style={{ marginBottom: '1rem' }}>
                        Share Workout
                    </h3>
                    <fieldset>
                        <label className="formLabel" htmlFor="name">
                            ID (empty for autogenerated)
                        </label>
                        <input {...register('id')} id="id" className="formInput" />
                    </fieldset>
                    <fieldset>
                        <label className="formLabel" htmlFor="name">
                            Master Key
                        </label>
                        <input
                            {...register('secret', { required: true })}
                            id="secret"
                            type="password"
                            className="formInput"
                        />
                        {errors.secret && <p className="formError">Secret is required</p>}
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button disabled={shareLoading} type="submit" className="formBtnSubmit">
                            Confirm
                        </button>
                        <button
                            onClick={() => props.onCancel()}
                            disabled={shareLoading}
                            type="button"
                            className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};