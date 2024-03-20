import React from 'react';
import Image from 'next/image';
import style from './action-bar.module.css';
import { useRouter } from 'next/router';

export default function ActionBar() {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className={style.actionBarWrapper}>
        <button onClick={navigateHome} className="w-24 bg">
          <Image src="/icons/home-icon.svg" alt="home" width={30} height={30} className="m-auto" />
          <p>Home</p>
        </button>
      </div>
    </>
  );
}
