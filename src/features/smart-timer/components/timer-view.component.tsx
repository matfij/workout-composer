import Image from 'next/image';
import { useEffect, useState } from 'react';
import UtilService from '../../../common/services/utils-service';
import { Timer } from '../definitions';
import TimerStoreService from '../services/timer-store-service';
import style from './timer-view.module.css';

export default function TimerView() {
  const timerTimeouts = [setTimeout(() => null, 0)];
  const [timer, setTimer] = useState<Timer>();
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
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
    setActiveTimerIndex(0);
    let delay = 0;
    timer?.intervals.forEach((interval, index) => {
      delay += +interval.value;
      timerTimeouts.push(
        setTimeout(() => {
          setActiveTimerIndex(index + 1);
        }, 1000 * delay),
        setTimeout(() => {
          UtilService.playSound('/sounds/timer-sound.mp3');
        }, 1000 * delay - 2000)
      );
    });
  };

  const stopTimer = () => {
    setActiveTimerIndex(0);
    timerTimeouts.forEach((timerTimeout) => {
      clearInterval(timerTimeout);
    });
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
                <p className={index === activeTimerIndex ? `${style.activeTime}` : `${style.inactiveTime}`}>
                  {interval.value} s
                </p>
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
