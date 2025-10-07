import { UtilityManger } from '../../../shared/managers/utility-manager';
import { Day, Task } from '../types';

export class WorkoutParser {
    private static readonly DAY_SEPARATOR = '\n\n';
    private static readonly TASK_SEPARATOR = '\n\t';
    private static readonly SETS_SEPARATOR = ' | ';
    private static readonly REPS_SEPARATOR = ' x ';
    private static readonly DESCRIPTION_SEPARATOR_START = ' (';
    private static readonly DESCRIPTION_SEPARATOR_END = ')';

    public static serializeWorkout(days: Day[]) {
        let textData = '';

        for (const day of days) {
            if (textData.length > 0) {
                textData += this.DAY_SEPARATOR;
            }
            textData += `${day.name}`;

            for (const task of day.tasks) {
                textData +=
                    this.TASK_SEPARATOR +
                    task.name +
                    this.SETS_SEPARATOR +
                    task.sets +
                    this.REPS_SEPARATOR +
                    task.reps;
                if (task.description) {
                    textData +=
                        this.DESCRIPTION_SEPARATOR_START + task.description + this.DESCRIPTION_SEPARATOR_END;
                }
            }
        }

        return textData;
    }

    public static deserializeWorkout(workout: string) {
        const days: Day[] = [];

        const rawDays = workout.split(this.DAY_SEPARATOR);
        for (const rawDay of rawDays) {
            const rawTasks = rawDay.split(this.TASK_SEPARATOR);
            const tasks: Task[] = [];

            for (const rawTask of rawTasks.slice(1)) {
                const [name, setsLeft] = rawTask.split(this.SETS_SEPARATOR);
                const [sets, repsLeft] = setsLeft.split(this.REPS_SEPARATOR);
                const [reps, description] = repsLeft.split(this.DESCRIPTION_SEPARATOR_START);
                tasks.push({
                    id: UtilityManger.generateId(),
                    name: name,
                    reps: reps.trim(),
                    sets: sets.trim(),
                    ...(description && { description: description.split(this.DESCRIPTION_SEPARATOR_END)[0] }),
                });
            }

            days.push({
                id: UtilityManger.generateId(),
                name: rawTasks[0],
                tasks: tasks,
            });
        }

        return days;
    }
}
