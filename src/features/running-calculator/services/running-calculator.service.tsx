import { RunPaceInput } from '../definitions';

export default class RunningCalculatorService {

  static calculateRunPace(input: RunPaceInput): number {
    const totalDistanceKilometers = 0 + +input.distanceKilometers + +input.distanceMeters/1000;
    const targetTimeMinutes = 0 + 60*+input.timeHours + +input.timeMinutes + +input.timeSeconds/60;
    return targetTimeMinutes/totalDistanceKilometers;
  }

  static formatRunPace(minutesPerKilometer: number): string {
    const minutes = Math.floor(minutesPerKilometer);
    let seconds = Math.floor((minutesPerKilometer - minutes) * 60).toString();
    if (seconds.length === 1) seconds = '0' + seconds;
    return `${minutes}:${seconds} min/km`;
  }

  static calculateRunSpeed(minutesPerKilometer: number): number {
    const kilometersPerHour = 1/minutesPerKilometer * 60;
    return Math.round(kilometersPerHour * 100) / 100;
  }
}
