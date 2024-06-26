export interface Exercise {
  id: string;
  name: string;
  reps?: string;
  sets?: string;
  description?: string;
}

export interface ExerciseList {
  day: string;
  exercises: Exercise[];
}

export interface ExerciseBoard {
  days: ExerciseList[];
  standby: Exercise[];
  locked: boolean;
  editedExercise?: Exercise;
}

export interface DayFormFields {
  name: string;
}
