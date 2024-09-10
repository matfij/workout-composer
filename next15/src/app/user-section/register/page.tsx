'use client';

import style from '../page.module.scss';
import { useFormState } from 'react-dom';
import { register } from '../_actions/user-actions';

export default function RegisterPage() {
    const [error, action] = useFormState(register, {
        username: '',
        password: '',
    });

    return (
        <main className={style.mainWrapper}>
            <h2>Create a new account</h2>
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
                <fieldset>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" />
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    );
}
