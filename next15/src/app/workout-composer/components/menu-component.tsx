import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '../workout-store';

const imgSize = { width: 28, height: 28 };

type MenuComponentProps = {
    showAddForm: () => void;
};

export const MenuComponent = (props: MenuComponentProps) => {
    const router = useRouter();
    const { isLocked, lock, unlock } = useWorkoutStore();

    const onShare = () => {};

    return (
        <nav className="menuWrapper">
            <button onClick={() => router.push('/')} className="menuItem">
                <Image src="/icons/home-icon.svg" alt="home" {...imgSize} />
                <p>Home</p>
            </button>
            <button onClick={props.showAddForm} className="menuItem">
                <Image src="/icons/add-icon.svg" alt="add" {...imgSize} />
                <p>Add</p>
            </button>
            <button onClick={onShare} className="menuItem">
                <Image src="/icons/share-icon.svg" alt="share" {...imgSize} />
                <p>Share</p>
            </button>
            {!isLocked && (
                <button onClick={lock} className="menuItem">
                    <Image src="/icons/unlock-icon.svg" alt="lock" {...imgSize} />
                    <p>Lock</p>
                </button>
            )}
            {isLocked && (
                <button onClick={unlock} className="menuItem">
                    <Image src="/icons/lock-icon.svg" alt="unlock" {...imgSize} />
                    <p>Unlock</p>
                </button>
            )}
        </nav>
    );
};
