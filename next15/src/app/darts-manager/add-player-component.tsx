import { useForm } from 'react-hook-form';
import { useDartsStore } from './darts-store';
import { DartsPlayerPlace } from './types';

type AddPlayerComponentProps = {
    onCancel: () => void;
};

export const AddPlayerComponent = (props: AddPlayerComponentProps) => {
    const { addPlayer } = useDartsStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string; points: number }>();

    const onAddPlayer = (data: { name: string; points: number }) => {
        addPlayer({
            name: data.name,
            points: data.points,
            throws: [],
            place: DartsPlayerPlace.None,
        });
        props.onCancel();
    };

    return (
        <section className="modalBackdrop">
            <div className="modalWrapper">
                <form onSubmit={handleSubmit(onAddPlayer)} className="formWrapper">
                    <h3 className="subtitle bold dark left">Add new player</h3>
                    <fieldset>
                        <label htmlFor="name" className="formLabel">
                            Name
                        </label>
                        <input {...register('name', { required: true })} type="text" className="formInput" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="points" className="formLabel">
                            Starting points
                        </label>
                        <input
                            {...register('points', { required: true })}
                            defaultValue={501}
                            className="formInput"
                            type="number"
                        />
                    </fieldset>
                    <div className="formActionsWrapper">
                        <button type="submit" className="formBtnSubmit">
                            Add
                        </button>
                        <button onClick={props.onCancel} type="button" className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
