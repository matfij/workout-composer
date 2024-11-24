import Image from 'next/image';
import { useRouter } from 'next/navigation';

const imgSize = { width: 28, height: 28 };

type MenuComponentProps = {
    showAddForm: () => void;
};

export const MenuComponent = (props: MenuComponentProps) => {
    const router = useRouter();

    const onShare = () => {};

    const onLock = () => {};

    const onUnlock = () => {};

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
            <button onClick={onLock} className="menuItem">
                <Image src="/icons/lock-icon.svg" alt="lock" {...imgSize} />
                <p>Lock</p>
            </button>
            <button onClick={onUnlock} className="menuItem">
                <Image src="/icons/unlock-icon.svg" alt="unlock" {...imgSize} />
                <p>Unlock</p>
            </button>
        </nav>
    );
};
