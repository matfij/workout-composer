export class UtilityManger {
    public static generateId(): string {
        return `${(Math.random() + 1).toString(16).substring(2)}-${(Math.random() + 1)
            .toString(16)
            .substring(2)}`;
    }

    public static getEnvVar<T extends string | number | boolean>(name: string): T {
        return process.env[name] as T;
    }
}
