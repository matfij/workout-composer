import { BaseContext } from 'next/dist/shared/lib/utils';
import { useState, useEffect } from 'react';
import UtilService from '../common/services/utils-service';
import ActionBar from '../features/workout-composer/components/action-bar.component';
import ExerciseList from '../features/workout-composer/components/exercise-list.component';
import { useSetExerciseBoardContext } from '../features/workout-composer/contexts/exercise-board.context';
import { ExerciseBoard } from '../features/workout-composer/definitions';
import { PersistenceService } from '../features/workout-composer/services/persistence-service';
import { StorageService } from '../common/services/storage-service';

type Props = {
  exerciseBoard: ExerciseBoard | undefined;
};

export default function WorkoutComposer({ exerciseBoard }: Props) {
  const updateBoardData = useSetExerciseBoardContext();
  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    if (exerciseBoard && exerciseBoard.days && exerciseBoard.standby) {
      updateBoardData({
        days: exerciseBoard.days.map((day) => ({
          day: day.day,
          exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
        })),
        standby: exerciseBoard.standby.map((exercise) => ({
          ...exercise,
          id: UtilService.generateId(),
        })),
        locked: exerciseBoard.locked || false,
      });
      StorageService.write('workoutData', exerciseBoard);
    }
    const localWorkoutData = StorageService.read('workoutData');
    if (!localWorkoutData || !localWorkoutData.days || !localWorkoutData.standby) {
      return;
    }
    updateBoardData({
      days: localWorkoutData.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
      })),
      standby: localWorkoutData.standby.map((exercise) => ({
        ...exercise,
        id: UtilService.generateId(),
      })),
      locked: localWorkoutData.locked || false,
    });
  }, []);

  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <main className="mainWrapper">
      <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
        Workout Composer
      </h1>
      <div className="flex flex-col">
        {winReady ? <ExerciseList /> : null}
        <ActionBar />
      </div>
    </main>
  );
}

export const getServerSideProps = async (context: BaseContext) => {
  const id = context.query.id;
  if (!id) {
    return {
      props: { exerciseBoard: null },
    };
  }
  const exerciseBoard = await PersistenceService.getWorkoutData(id);
  console.log('exerciseBoard', exerciseBoard)
  return {
    props: { exerciseBoard },
  };
};
