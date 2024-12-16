export class MusicManager {
    private static audio: HTMLAudioElement;
    private static BASE_PATH = '/sounds';
    private static EXTENSION = 'mp3';

    static playSound(sound: 'victory-sound') {
        if (!this.audio) {
            this.audio = new Audio();
        }
        this.audio.pause();
        this.audio.src = `${this.BASE_PATH}/${sound}.${this.EXTENSION}`;
        this.audio.play();
    }
}
