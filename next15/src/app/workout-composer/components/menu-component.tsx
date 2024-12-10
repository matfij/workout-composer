import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '../workout-store';
import { ToastManager } from '../../../shared/managers/toast-manager';
import { saveWorkout } from '../actions';
import { useState } from 'react';
import { DayFormComponent } from './day-form-component';

const imgSize = { width: 28, height: 28 };

export const MenuComponent = () => {
    const router = useRouter();
    const { days, isLocked, setIsLocked } = useWorkoutStore();
    const [isSharing, setIsSharing] = useState(false);
    const [showDayForm, setShowDayForm] = useState(false);

    const onShare = async () => {
        setIsSharing(true);
        const workoutId = await saveWorkout(days);
        window.history.pushState({}, document.title, '/');
        navigator.clipboard.writeText(`${window.location.href}workout-composer?id=${workoutId}`);
        window.history.pushState({}, document.title, `workout-composer?id=${workoutId}`);
        ToastManager.showInfo('💫 Workout link copied!');
        setIsSharing(false);
    };

    return (
        <>
            {showDayForm && <DayFormComponent onCancel={() => setShowDayForm(false)} />}
            <nav className="menuWrapper">
                <button onClick={() => router.push('/')} disabled={isSharing} className="menuItem">
                    <Image src="/icons/home-icon.svg" alt="home" {...imgSize} />
                    <p>Home</p>
                </button>
                {!isLocked && (
                    <button onClick={() => setShowDayForm(true)} className="menuItem">
                        <Image src="/icons/add-icon.svg" alt="add" {...imgSize} />
                        <p>Add</p>
                    </button>
                )}
                {isLocked && (
                    <button onClick={onShare} disabled={isSharing} className="menuItem">
                        <Image src="/icons/share-icon.svg" alt="share" {...imgSize} />
                        <p>Share</p>
                    </button>
                )}
                {!isLocked && (
                    <button onClick={() => setIsLocked(true)} className="menuItem">
                        <Image src="/icons/unlock-icon.svg" alt="lock" {...imgSize} />
                        <p>Lock</p>
                    </button>
                )}
                {isLocked && (
                    <button onClick={() => setIsLocked(false)} disabled={isSharing} className="menuItem">
                        <Image src="/icons/lock-icon.svg" alt="unlock" {...imgSize} />
                        <p>Unlock</p>
                    </button>
                )}
            </nav>
        </>
    );
};
