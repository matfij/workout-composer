import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { DatabaseManager } from './shared/managers/database-manager';
import { User } from './app/user-section/_definitions/types';

const getUser = async (credentials: Partial<Record<string, unknown>>): Promise<User | null> => {
    if (
        !credentials.username ||
        typeof credentials.username !== 'string' ||
        !credentials.password ||
        typeof credentials.password !== 'string'
    ) {
        throw new Error('Invalid credentials');
    }
    const user = await DatabaseManager.getUser(credentials.username);
    if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
    }
    return user;
};

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const user = await getUser(credentials);
                if (!user) {
                    return null;
                }
                return {
                    name: user?.username,
                };
            },
        }),
    ],
});
