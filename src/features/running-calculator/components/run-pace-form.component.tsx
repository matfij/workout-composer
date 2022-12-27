import { useForm } from 'react-hook-form';
import Image from 'next/image';
import style from './run-pace-form.module.css';
import { RunPaceInput } from '../definitions';
import { useState } from 'react';
import RunningCalculatorService from '../services/running-calculator.service';

export default function RunPeaceForm() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<RunPaceInput>();
  const [paceResult, setPaceResult] = useState<string>('');
  const [speedResult, setSpeedResult] = useState<string>('');

  const calculateRunPace = (input: RunPaceInput) => {
    const pace = RunningCalculatorService.calculateRunPace(input);
    const paceFormatted = RunningCalculatorService.formatRunPace(pace);
    setPaceResult(paceFormatted);
    const speed = RunningCalculatorService.calculateRunSpeed(pace);
    setSpeedResult(`${speed} km/h`);
  };

  return (
    <section className={style.sectionWrapper}>
      <div className="flex items-center content-center justify-center gap-4 my-4">
        <h3 className="text-white text-xl font-semibold">Run Pace</h3>
        <Image
          onClick={() => setDisplayForm(!displayForm)}
          src="/icons/reveal-icon.svg"
          alt="reveal"
          width={30}
          height={30}
        />
      </div>
      {displayForm && (
        <>
          <form className={style.formWrapper} onSubmit={handleSubmit(calculateRunPace)}>
            <p className="text-white text-lg font-semibold">Distance</p>
            <div className="flex gap-2">
              <fieldset className="w-1/2 flex items-center">
                <input
                  {...register('distanceKilometers', { min: 0, max: 1000 })}
                  className={style.formInput}
                  type="number"
                  name="distanceKilometers"
                  id="distanceKilometers"
                />
                <label className={style.formLabel} htmlFor="distanceKilometers">
                  km
                </label>
              </fieldset>
              <fieldset className="w-1/2 flex items-center">
                <input
                  {...register('distanceMeters', { min: 0, max: 999 })}
                  className={style.formInput}
                  type="number"
                  name="distanceMeters"
                  id="distanceMeters"
                />
                <label className={style.formLabel} htmlFor="distanceMeters">
                  m
                </label>
              </fieldset>
            </div>

            <p className="mt-2 text-white text-lg font-semibold">Planned time</p>
            <div className="flex gap-2">
              <fieldset className="w-1/3 flex items-center">
                <input
                  {...register('timeHours')}
                  className={style.formInput}
                  type="number"
                  name="timeHours"
                  id="timeHours"
                  min={0}
                  max={100}
                />
                <label className={style.formLabel} htmlFor="timeHours">
                  h
                </label>
              </fieldset>
              <fieldset className="w-1/3 flex items-center">
                <input
                  {...register('timeMinutes')}
                  className={style.formInput}
                  type="number"
                  name="timeMinutes"
                  id="timeMinutes"
                  min={0}
                  max={59}
                />
                <label className={style.formLabel} htmlFor="timeMinutes">
                  m
                </label>
              </fieldset>
              <fieldset className="w-1/3 flex items-center">
                <input
                  {...register('timeSeconds')}
                  className={style.formInput}
                  type="number"
                  name="timeSeconds"
                  id="timeSeconds"
                  min={0}
                  max={59}
                />
                <label className={style.formLabel} htmlFor="timeSeconds">
                  s
                </label>
              </fieldset>
            </div>

            <button className={style.formBtnSubmit}>Calculate</button>
          </form>
          {paceResult && speedResult && (
            <p className="m-4 mt-0 text-white text-lg font-semibold">
              Required pace = {paceResult} <br /> Required speed = {speedResult}
            </p>
          )}
        </>
      )}
    </section>
  );
}
