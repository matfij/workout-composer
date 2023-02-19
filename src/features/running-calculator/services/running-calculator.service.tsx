import { RunPaceInput, RunTimeInput } from '../definitions';

export default class RunningCalculatorService {
  static calculateRunPace(input: RunPaceInput): number {
    const totalDistanceKilometers = 0 + +input.distanceKilometers + +input.distanceMeters / 1000;
    const targetTimeMinutes = 0 + 60 * +input.timeHours + +input.timeMinutes + +input.timeSeconds / 60;
    if (totalDistanceKilometers === 0 || targetTimeMinutes === 0) return 0;
    return targetTimeMinutes / totalDistanceKilometers;
  }

  static formatRunPace(minutesPerKilometer: number): string {
    const minutes = Math.floor(minutesPerKilometer);
    let seconds = Math.floor((minutesPerKilometer - minutes) * 60).toString();
    if (seconds.length === 1) seconds = '0' + seconds;
    return `${minutes}:${seconds} min/km`;
  }

  static calculateRunSpeed(minutesPerKilometer: number): number {
    if (+minutesPerKilometer === 0) return 0;
    const kilometersPerHour = (1 / minutesPerKilometer) * 60;
    return Math.round(kilometersPerHour * 100) / 100;
  }

  static calculateRunTimeInHours(input: RunTimeInput): number {
    console.log(input)
    if (input.speedKilometers) {
      const totalDistanceKilometers = 0 + +input.distanceKilometers + +input.distanceMeters / 1000;
      const targetSpeedKilometers = 0 + +input.speedKilometers;
      if (totalDistanceKilometers === 0 || targetSpeedKilometers === 0) return 0;
      return totalDistanceKilometers / targetSpeedKilometers;
    } else if (input.paceMinutes || input.paceSeconds) {
      const totalDistanceKilometers = 0 + +input.distanceKilometers + +input.distanceMeters / 1000;
      const targetPaceMinutes = 0 + +input.paceMinutes + +input.paceSeconds / 60;
      return targetPaceMinutes * totalDistanceKilometers / 60;
    } else {
      return 0;
    }
  }

  static formatRunTime(timeInHours: number): string {
    if (+timeInHours === 0) return '0s';
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - Math.floor(timeInHours)) * 60);
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return `${hours}h ${this.formatField(minutes)}m ${this.formatField(seconds)}s`;
  }

  private static formatField(field: number): string {
    if (field < 10) return `0${field}`;
    return `${field}`;
  }
}
