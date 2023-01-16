import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Timer } from '../definitions';
import TimerStoreService from '../services/timer-store-service';
import style from './timer-view.module.css';

export default function TimerView() {
  const [timer, setTimer] = useState<Timer>();
  const [displayTimer, setDisplayTimer] = useState(true);

  useEffect(() => {
    getTimer();
  }, []);

  const getTimer = () => {
    const savedTimer = TimerStoreService.getTimer();
    if (!savedTimer) return;
    setTimer(savedTimer);
  };

  const startTimer = () => {
    console.log('start...');
  };

  const stopTimer = () => {
    console.log('stop...');
  };

  return (
    <section className={style.sectionWrapper}>
      <div className="flex items-center content-center justify-center gap-4 my-4">
        <h3 className="text-white text-xl font-semibold">Timer</h3>
        <Image
          onClick={() => setDisplayTimer(!displayTimer)}
          className={displayTimer ? `${style.revealIconClose} ${style.revealIcon}` : style.revealIcon}
          src="/icons/reveal-icon.svg"
          alt="reveal"
          width={30}
          height={30}
        />
      </div>
      {displayTimer && (
        <div>
          <div className="flex w-full justify-center gap-4 mb-2">
            {timer?.intervals.map((interval, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <Image
                    className="mr-2"
                    src="/icons/timer-direction-icon.svg"
                    alt="time direction"
                    width={20}
                    height={20}
                  />
                )}
                <p className="text-white text-xl font-semibold">{interval.value} s</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-2">
            <button onClick={getTimer} className={style.formBtn}>
              Reload
            </button>
            <button onClick={startTimer} className={style.formBtn}>
              Start
            </button>
            <button onClick={stopTimer} className={style.formBtn}>
              Stop
            </button>
          </div>
        </div>
      )}
    </section>
  );
}