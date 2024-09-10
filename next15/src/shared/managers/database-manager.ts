import { kv } from '@vercel/kv';
import { User } from '../../app/user-section/_definitions/types';

export class DatabaseManager {
    // private static generateId(): string {
    //     return `${(Math.random() + 1).toString(16).substring(2)}-${(Math.random() + 1)
    //         .toString(16)
    //         .substring(2)}`;
    // }

    public static async getUser(username: string): Promise<User | null> {
        const user = await kv.get<User>(username);
        return user;
    }

    public static async createUser(user: Pick<User, 'username' | 'password'>): Promise<User> {
        let i = await kv.set(user.username, user);
        return user;
    }
}
