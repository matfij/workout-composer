import Image from 'next/image';
import { useRouter } from 'next/navigation';

const imgSize = { width: 28, height: 28 };

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
                <Image src="/icons/home-icon.svg" alt="home" {...imgSize} />
                <p>Home</p>
            </button>
            <button onClick={props.showAddPlayerForm} className="menuItem">
                <Image src="/icons/add-icon.svg" alt="add" {...imgSize} />
                <p>Add player</p>
            </button>
            <button onClick={props.showResetGameDialog} className="menuItem">
                <Image src="/icons/reset-icon.svg" alt="reset" {...imgSize} />
                <p>Reset</p>
            </button>
            <button onClick={props.showUndoDialog} className="menuItem">
                <Image src="/icons/undo-icon.svg" alt="undo" {...imgSize} />
                <p>Undo</p>
            </button>
        </nav>
    );
};
