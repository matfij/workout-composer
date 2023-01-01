import { useState } from 'react';
import Image from 'next/image';
import style from './run-time-form.module.css';
import { useForm } from 'react-hook-form';
import { RunTimeInput } from '../definitions';
import RunningCalculatorService from '../services/running-calculator.service';

export default function RunTimeForm() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<RunTimeInput>();
  const [timeResult, setTimeResult] = useState('');

  const calculateRunTime = (input: RunTimeInput) => {
    const runTime = RunningCalculatorService.calculateRunTimeInHours(input);
    const runTimeFormatted = RunningCalculatorService.formatRunTime(runTime);
    setTimeResult(runTimeFormatted);
  };

  return (
    <section className={style.sectionWrapper}>
      <div className="flex items-center content-center justify-center gap-4 my-4">
        <h3 className="text-white text-xl font-semibold">Run Time</h3>
        <Image
          onClick={() => setDisplayForm(!displayForm)}
          className={displayForm ? `${style.revealIconClose} ${style.revealIcon}` : style.revealIcon}
          src="/icons/reveal-icon.svg"
          alt="reveal"
          width={30}
          height={30}
        />
      </div>
      {displayForm && (
        <>
          <form onSubmit={handleSubmit(calculateRunTime)} className={style.formWrapper}>
            <p className="text-white text-lg font-semibold">Distance</p>
            <div className="flex gap-2">
              <fieldset className="w-1/2 flex items-center">
                <input
                  {...register('distanceKilometers', { min: 0, max: 1000 })}
                  className={style.formInput}
                  type="number"
                  name="distanceKilometers"
                  id="distanceKilometers"
                  min={0}
                  max={1000}
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
                  min={0}
                  max={999}
                />
                <label className={style.formLabel} htmlFor="distanceMeters">
                  m
                </label>
              </fieldset>
            </div>
            <p className="mt-2 text-white text-lg font-semibold">Speed</p>
            <div className="flex gap-2">
              <fieldset className="w-2/3 sm:w-1/2 flex items-center">
                <input
                  {...register('speedKilometers')}
                  className={style.formInput}
                  type="number"
                  step={0.1}
                  name="speedKilometers"
                  id="speedKilometers"
                  min={0}
                  max={100}
                />
                <label className={style.formLabel} htmlFor="speedKilometers">
                  km/h
                </label>
              </fieldset>
            </div>

            <button className={style.formBtnSubmit}>Calculate</button>
          </form>
          {timeResult && (
            <p className="m-4 mt-0 text-white text-lg font-semibold">Required time = {timeResult}</p>
          )}
        </>
      )}
    </section>
  );
}
