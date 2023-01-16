import { Timer } from "../definitions";

export default class TimerStoreService {
    static readonly TIMER_KEY = 'wc-saved-timer';

    static saveTimer(timer: Timer) {
        localStorage.setItem(this.TIMER_KEY, JSON.stringify(timer));
    }

    static getTimer(): Timer | null {
        const timer = localStorage.getItem(this.TIMER_KEY);
        if (!timer) {
            return null;
        } else {
            return JSON.parse(timer) as Timer;
        }
    }
}
