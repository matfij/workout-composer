'use client';

import style from './page.module.scss';
import { login } from './_actions/user-actions';
import Link from 'next/link';
import { useActionState } from 'react';

export default function UserSectionPage() {
    const [errorMessage, formAction, isPending] = useActionState(login, undefined);

    return (
        <main className={style.mainWrapper}>
            <h2>User Section - Login</h2>
            <hr />
            <form action={formAction}>
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
