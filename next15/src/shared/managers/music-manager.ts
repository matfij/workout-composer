export class MusicManager {
    private static audio = new Audio();
    private static BASE_PATH = '/sounds';
    private static EXTENSION = 'mp3';

    static playSound(sound: 'victory-sound') {
        this.audio.pause();
        this.audio.src = `${this.BASE_PATH}/${sound}.${this.EXTENSION}`;
        this.audio.play();
    }
}
