import style from '../page.module.scss';
import { useEffect, useState } from 'react';

export const PaceDistanceCalculator = () => {
    const [open, setOpen] = useState(false);
    const [distanceMeters, setDistanceMeters] = useState<string>('');
    const [distanceKilometers, setDistanceKilometers] = useState<string>('');
    const [timeHours, setTimeHours] = useState<string>('');
    const [timeMinutes, setTimeMinutes] = useState<string>('');
    const [pace, setPace] = useState<string>('');

    useEffect(() => recalculatePace(), [distanceMeters, distanceKilometers, timeHours, timeMinutes]);

    const recalculatePace = () => {
        const totalDistanceMeters =
            (!isNaN(parseFloat(distanceMeters)) ? parseFloat(distanceMeters) : 0) +
            1000 * (!isNaN(parseFloat(distanceKilometers)) ? parseFloat(distanceKilometers) : 0);

        const totalTimeMinutes =
            (!isNaN(parseFloat(timeMinutes)) ? parseFloat(timeMinutes) : 0) +
            60 * (!isNaN(parseFloat(timeHours)) ? parseFloat(timeHours) : 0);

        if (totalDistanceMeters === 0 || totalTimeMinutes === 0) {
            setPace('');
            return;
        }

        const newPaceMinutes = Math.floor(1000 * (totalTimeMinutes / totalDistanceMeters));
        let newPaceSeconds = Math.round(
            60 * ((1000 * (totalTimeMinutes / totalDistanceMeters)) % 1),
        ).toString();
        if (newPaceSeconds.length < 2) {
            newPaceSeconds = `0${newPaceSeconds}`;
        }

        setPace(`${newPaceMinutes}:${newPaceSeconds} [min/km]`);
    };

    return (
        <div className={style.sectionWrapper}>
            <h2 className={style.sectionHeader} onClick={() => setOpen((prev) => !prev)}>
                Target Pace Calculator
            </h2>
            <section className="formWrapper" style={{ display: open ? 'block' : 'none', background: 'none' }}>
                <div className="flex">
                    <fieldset>
                        <label className="formLabel">Distance [km]</label>
                        <input
                            value={distanceKilometers}
                            type="number"
                            className="formInput"
                            onChange={(e) => setDistanceKilometers(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label className="formLabel">Distance [m]</label>
                        <input
                            value={distanceMeters}
                            type="number"
                            className="formInput"
                            onChange={(e) => setDistanceMeters(e.target.value)}
                        />
                    </fieldset>
                </div>
                <hr style={{ margin: '1rem 0' }} />
                <div className="flex">
                    <fieldset>
                        <label className="formLabel">Time [h]</label>
                        <input
                            value={timeHours}
                            type="number"
                            className="formInput"
                            onChange={(e) => setTimeHours(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label className="formLabel">Time [min]</label>
                        <input
                            value={timeMinutes}
                            type="number"
                            className="formInput"
                            onChange={(e) => setTimeMinutes(e.target.value)}
                        />
                    </fieldset>
                </div>
                <hr style={{ margin: '1rem 0' }} />
                <p className="subtitle">
                    Target pace: <b>{pace}</b>
                </p>
            </section>
        </div>
    );
};
