export class UtilityManger {
    public static generateId(): string {
        return crypto.randomUUID();
    }

    public static getEnvVar<T extends string | number | boolean>(name: string): T {
        return process.env[name] as T;
    }

    public static getRandomArrayElement<T>(array: Array<T>) {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }
}
