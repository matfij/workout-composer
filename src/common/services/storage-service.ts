import { ExerciseBoard } from "../../features/workout-composer/definitions";

export type StorageData = {
  workoutData: Partial<ExerciseBoard>;
};

export type StorageKey = keyof StorageData;

export class StorageService {
  static write<K extends StorageKey>(key: K, value: StorageData[K]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static read<K extends StorageKey>(key: K): StorageData[K] | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw error;
    }
  }
}
