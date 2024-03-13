import React from 'react';
import Image from 'next/image';
import style from './action-bar.module.css';
import { useRouter } from 'next/router';

type Props = {
  showAddUserForm: () => void;
  showResetGameDialog: () => void;
  showClearGameDialog: () => void;
};

export default function ActionBar(props: Props) {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <>
      <nav className={style.actionBarWrapper}>
        <button onClick={navigateHome} className="w-24 bg">
          <Image src="/icons/home-icon.svg" alt="home" width={30} height={30} className="m-auto" />
          <p>Home</p>
        </button>
        <button onClick={props.showAddUserForm} className="w-24 bg">
          <Image src="/icons/add-user.svg" alt="add-user" width={28} height={28} className="m-auto" />
          <p>Add user</p>
        </button>
        <button onClick={props.showResetGameDialog} className="w-24 bg">
          <Image src="/icons/reset-icon.svg" alt="add-user" width={28} height={28} className="m-auto" />
          <p>Reset</p>
        </button>
        <button onClick={props.showClearGameDialog} className="w-24 bg">
          <Image src="/icons/erase-icon.svg" alt="add-user" width={28} height={28} className="m-auto" />
          <p>Clear</p>
        </button>
      </nav>
    </>
  );
}
