import type { NextAuthConfig } from 'next-auth';

const PROTECTED_PAGES = ['/workout-composer'];

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            if (PROTECTED_PAGES.includes(nextUrl.pathname)) {
                return isLoggedIn;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
};
