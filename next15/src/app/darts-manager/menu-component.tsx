import Image from 'next/image';
import { useRouter } from 'next/navigation';

const IMG_SIZE = { width: 28, height: 28 };

type MenuComponentProps = {
    showAddPlayerForm: () => void;
    showResetGameDialog: () => void;
    showUndoDialog: () => void;
};

export const MenuComponent = (props: MenuComponentProps) => {
    const router = useRouter();

    return (
        <nav className="menuWrapper">
            <button onClick={() => router.push('/')} className="menuItem">
                <Image src="/icons/home-icon.svg" alt="home" {...IMG_SIZE} />
                <p>Home</p>
            </button>
            <button onClick={props.showAddPlayerForm} className="menuItem">
                <Image src="/icons/add-player-icon.svg" alt="add" {...IMG_SIZE} />
                <p>Add player</p>
            </button>
            <button onClick={props.showResetGameDialog} className="menuItem">
                <Image src="/icons/reset-icon.svg" alt="reset" {...IMG_SIZE} />
                <p>Reset</p>
            </button>
            <button onClick={props.showUndoDialog} className="menuItem">
                <Image src="/icons/undo-icon.svg" alt="undo" {...IMG_SIZE} />
                <p>Undo</p>
            </button>
        </nav>
    );
};
