export default class UtilService {
  static generateId(): string {
    return (Math.random() + 1).toString(16).substring(2);
  }

  static playSound(soundUrl: string) {
    const audio = new Audio(soundUrl);
    audio.play();
  }
}
