import Image from 'next/image';
import style from '../page.module.scss';
import { useState } from 'react';

export const TreadmillCalculatorComponent = () => {
    const [open, setOpen] = useState(false);
    const [speed, setSpeed] = useState<string>('');
    const [pace, setPace] = useState<string>('');
    const [inputMode, setInputMode] = useState<'speed' | 'pace'>('speed');

    const inputLabel = inputMode === 'speed' ? 'Speed [km/h]:' : 'Pace [min/km]:';
    const outputLabel = inputMode === 'pace' ? 'Speed [km/h]:' : 'Pace [min/km]:';

    const onToggleMode = () => setInputMode((prev) => (prev === 'speed' ? 'pace' : 'speed'));

    const onInputChange = (input: string) => {
        const inputValue = parseFloat(input);
        if (!input || !inputValue || isNaN(inputValue)) {
            setSpeed('');
            setPace('');
            return;
        }

        const output = (60 * 1) / inputValue;
        const outputDecimals = (output % 1) * (60 / 100);

        if (inputMode === 'speed') {
            setSpeed(input);
            setPace((Math.floor(output) + outputDecimals).toFixed(2));
        } else {
            setPace(input);
            setSpeed((Math.floor(output) + outputDecimals).toFixed(2));
        }
    };

    return (
        <div className={style.sectionWrapper}>
            <h2 className={style.sectionHeader} onClick={() => setOpen((prev) => !prev)}>
                Treadmill Calculator
            </h2>
            {open && (
                <Image
                    className={style.modeIcon}
                    src="/icons/rotate-icon-light.svg"
                    alt="mode"
                    width={32}
                    height={32}
                    onClick={onToggleMode}
                />
            )}
            <section className="formWrapper" style={{ display: open ? 'block' : 'none', background: 'none' }}>
                <fieldset>
                    <label className="formLabel">{inputLabel}</label>
                    <input
                        value={inputMode === 'speed' ? speed : pace}
                        type="number"
                        className="formInput"
                        onChange={(e) => onInputChange(e.target.value)}
                    />
                </fieldset>
                <hr style={{ margin: '1rem 0' }} />
                <p className="subtitle">
                    {outputLabel} <b>{inputMode === 'speed' ? pace : speed}</b>
                </p>
            </section>
        </div>
    );
};
