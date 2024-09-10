'use server';

import { DatabaseManager } from '../../../shared/managers/database-manager';
import { User } from '../_definitions/types';

export const register = async (_prev: unknown, formData: FormData): Promise<User> => {
    const credentials = {
        username: formData.get('username')?.toString(),
        password: formData.get('password')?.toString(),
    };

    if (!credentials.username || !credentials.password) {
        throw new Error('Invalid credentials');
    }

    const user = await DatabaseManager.createUser({
        username: credentials.username,
        password: credentials.password,
    });

    return user;
};

export const login = async (_prev: unknown, formData: FormData): Promise<User> => {
    const credentials = {
        username: formData.get('username')?.toString(),
        password: formData.get('password')?.toString(),
    };

    if (!credentials.username || !credentials.password) {
        throw new Error('Invalid credentials');
    }

    const user = await DatabaseManager.getUser(credentials.username);

    if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
    }

    return user;
};
