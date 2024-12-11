import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '../workout-store';
import { useState } from 'react';
import { DayFormComponent } from './day-form-component';
import { ShareModalComponent } from './share-modal-component';

const imgSize = { width: 28, height: 28 };

export const MenuComponent = () => {
    const router = useRouter();
    const { isLocked, setIsLocked } = useWorkoutStore();
    const [showDayForm, setShowDayForm] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <>
            {showDayForm && <DayFormComponent onCancel={() => setShowDayForm(false)} />}
            {showShareModal && <ShareModalComponent onCancel={() => setShowShareModal(false)} />}
            <nav className="menuWrapper">
                <button onClick={() => router.push('/')} className="menuItem">
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
                    <button onClick={() => setShowShareModal(true)} className="menuItem">
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
                    <button onClick={() => setIsLocked(false)} className="menuItem">
                        <Image src="/icons/lock-icon.svg" alt="unlock" {...imgSize} />
                        <p>Unlock</p>
                    </button>
                )}
            </nav>
        </>
    );
};
