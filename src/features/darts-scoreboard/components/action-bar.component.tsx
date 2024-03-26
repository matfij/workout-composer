import React from 'react';
import Image from 'next/image';
import style from './action-bar.module.scss';
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
    <nav className={style.actionBarWrapper}>
      <button onClick={navigateHome} className={style.navItem}>
        <Image src="/icons/home-icon.svg" alt="home" width={28} height={28} />
        <p>Home</p>
      </button>
      <button onClick={props.showAddUserForm} className={style.navItem}>
        <Image src="/icons/add-user.svg" alt="add user" width={28} height={28} />
        <p>Add user</p>
      </button>
      <button onClick={props.showResetGameDialog} className={style.navItem}>
        <Image src="/icons/reset-icon.svg" alt="reset" width={28} height={28} />
        <p>Reset</p>
      </button>
      <button onClick={props.showClearGameDialog} className={style.navItem}>
        <Image src="/icons/erase-icon.svg" alt="clear" width={28} height={28} />
        <p>Clear</p>
      </button>
    </nav>
  );
}
