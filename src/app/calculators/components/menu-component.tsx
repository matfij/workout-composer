import Image from 'next/image';
import { useRouter } from 'next/navigation';

const imgSize = { width: 28, height: 28 };

export const MenuComponent = () => {
    const router = useRouter();

    return (
        <nav className="menuWrapper">
            <button onClick={() => router.push('/')} className="menuItem">
                <Image src="/icons/home-icon.svg" alt="home" {...imgSize} />
                <p>Home</p>
            </button>
        </nav>
    );
};
