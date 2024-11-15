import Image from 'next/image';
import { useRouter } from 'next/navigation';

type MenuComponentProps = {
    showAddUserForm: () => void;
    showResetGameDialog: () => void;
    showUndoDialog: () => void;
};

export const MenuComponent = (props: MenuComponentProps) => {
    const router = useRouter();

    const navigateHome = () => router.push('/');

    return (
        <nav className="menuWrapper">
            <button onClick={navigateHome} className='menuItem'>
                <Image src="/icons/home-icon.svg" alt="home" width={28} height={28} />
                <p>Home</p>
            </button>
            <button onClick={props.showAddUserForm} className='menuItem'>
                <Image src="/icons/add-user-icon.svg" alt="add" width={28} height={28} />
                <p>Add user</p>
            </button>
            <button onClick={props.showResetGameDialog} className='menuItem'>
                <Image src="/icons/reset-icon.svg" alt="reset" width={28} height={28} />
                <p>Reset</p>
            </button>
            <button onClick={props.showUndoDialog} className='menuItem'>
                <Image src="/icons/undo-icon.svg" alt="undo" width={28} height={28} />
                <p>Undo</p>
            </button>
        </nav>
    );
};
