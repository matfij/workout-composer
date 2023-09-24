import React from 'react';
import Image from 'next/image';
import style from './action-bar.module.css';
import { useRouter } from 'next/router';

type Props = {
  showAddUserForm: () => void;
  showResetScoresDialog: () => void;
};

export default function ActionBar(props: Props) {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <>
      <nav className={style.actionBarWrapper}>
        <button onClick={navigateHome} className="w-24 bg" data-testid="home-button">
          <Image src="/icons/home-icon.svg" alt="home" width={30} height={30} className="m-auto" />
          <p>Home</p>
        </button>
        <button onClick={props.showAddUserForm} className="w-24 bg" data-testid="show-add-user-form-button">
          <Image src="/icons/add-user.svg" alt="add-user" width={28} height={28} className="m-auto" />
          <p>Add user</p>
        </button>
        <button
          onClick={props.showResetScoresDialog}
          className="w-24 bg"
          data-testid="show-reset-scores-dialog-button"
        >
          <Image src="/icons/erase-icon.svg" alt="add-user" width={28} height={28} className="m-auto" />
          <p>Reset</p>
        </button>
      </nav>
    </>
  );
}
