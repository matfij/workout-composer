import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Task } from '../types';

type TaskCardComponentProps = {
    task: Task;
    index: number;
};

export const TaskCardComponent = (props: TaskCardComponentProps) => {
    return (
        <Draggable
            draggableId={props.task.id}
            index={props.index}
            children={(dragProvider) => renderTask(props.task, dragProvider)}
        />
    );
};

const renderTask = (task: Task, dragProvider: DraggableProvided) => (
    <div ref={dragProvider.innerRef} {...dragProvider.draggableProps} {...dragProvider.dragHandleProps}>
        {task.name}
    </div>
);
