export default class UtilService {
  static generateId(): string {
    return (Math.random() + 1).toString(16).substring(2);
  }
}
