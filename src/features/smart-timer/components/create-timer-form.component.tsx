import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';
import { CreateTimerInput } from '../definitions';
import style from './create-timer-form.module.css';

export default function CreateTimerForm() {
  const { control, register, handleSubmit } = useForm<CreateTimerInput>({
    defaultValues: {
      intervals: [{ value: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'intervals',
  });

  const createTimer = (input: CreateTimerInput) => {
    console.log(input.intervals);
  };

  return (
    <>
      <section className={style.sectionWrapper}>
        <div className="flex items-center content-center justify-center gap-4 my-4">
          <h3 className="text-white text-xl font-semibold">Create timer</h3>
        </div>
        <form className={style.formWrapper} onSubmit={handleSubmit(createTimer)}>
          <p className="text-white text-lg font-semibold">Intervals</p>
          {fields.map((field, index) => (
            <fieldset key={field.id} className="w-full md:w-2/3 flex items-center">
              <input
                {...register(`intervals.${index}.value`)}
                className={style.formInput}
                type="number"
                name={`intervals.${index}.value`}
                id={`intervals.${index}.value`}
                min={0}
                max={1000}
              />
              <label className={style.formLabel} htmlFor="timeMinutes">
                s
              </label>

              <div onClick={() => remove(index)} className="cursor-pointer">
                <Image src="/icons/remove-icon.svg" alt="remove" width={32} height={32} />
              </div>
            </fieldset>
          ))}
          <button onClick={() => append({ value: 0 })} className={style.formBtn}>
            Extend
          </button>

          <button className={style.formBtn}>Create</button>
        </form>
      </section>
    </>
  );
}
