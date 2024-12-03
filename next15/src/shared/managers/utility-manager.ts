export class UtilityManger {
    public static generateId(): string {
        return `${(Math.random() + 1).toString(16).substring(2)}-${(Math.random() + 1)
            .toString(16)
            .substring(2)}`;
    }
}
