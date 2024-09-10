'use client';

import style from './page.module.scss';
import { useFormState } from 'react-dom';
import { login, register } from './_actions/user-actions';
import Link from 'next/link';

export default function UserSectionPage() {
    const [error, action] = useFormState(login, {
        username: '',
        password: '',
    });

    return (
        <main className={style.mainWrapper}>
            <h2>User Section - Login</h2>
            <hr />
            <form action={action}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                </fieldset>
                <button>Login</button>
            </form>
            <hr />
            <p>or</p>
            <Link href={'/user-section/register'}>Create a new account</Link>
        </main>
    );
}
