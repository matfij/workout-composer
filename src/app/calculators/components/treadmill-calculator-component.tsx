import style from '../page.module.scss';
import { useState } from 'react';

export const TreadmillCalculatorComponent = () => {
    const [open, setOpen] = useState(false);
    const [speed, setSpeed] = useState<string>('');
    const [pace, setPace] = useState<string>('');

    const onSpeedChange = (speed: string) => {
        setSpeed(speed);
        const speedValue = parseFloat(speed);
        if (!speed || !speedValue || isNaN(speedValue)) {
            return;
        }
        const pace = (60 * 1) / speedValue;
        const paceDecimals = (pace % 1) * (60 / 100);
        setPace((Math.floor(pace) + paceDecimals).toFixed(2));
    };

    return (
        <div className={style.sectionWrapper}>
            <h2 className={style.sectionHeader} onClick={() => setOpen((prev) => !prev)}>
                Treadmill Calculator
            </h2>
            <section className="formWrapper" style={{ display: open ? 'block' : 'none', background: 'none' }}>
                <fieldset>
                    <label className="formLabel">Speed [km/h]:</label>
                    <input
                        value={speed}
                        type="number"
                        className="formInput"
                        onChange={(e) => onSpeedChange(e.target.value)}
                    />
                </fieldset>
                <fieldset style={{ marginTop: '1rem' }}>
                    <label>
                        Pace [min/km]: <b>{pace}</b>
                    </label>
                </fieldset>
            </section>
        </div>
    );
};
