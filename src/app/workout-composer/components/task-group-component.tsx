"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";

import { DroppableKind, TaskGroup } from "../types";
import { useWorkoutStore } from "../workout-store";
import { TaskItemComponent } from "./task-item-component";

import style from "./task-group-component.module.scss";

type TaskGroupComponentProps = {
    index: number;
    taskGroup: TaskGroup;
};

export const TaskGroupComponent = (props: TaskGroupComponentProps) => {
    const { isLocked } = useWorkoutStore();

    const wrapperClassName = !isLocked
        ? style.taskGroupWrapperEdit
        : props.taskGroup.tasks.length > 1
          ? style.taskGroupWrapperMultiple
          : "";

    return (
        <Draggable index={props.index} draggableId={props.taskGroup.id} isDragDisabled={isLocked}>
            {(dragProvider) => (
                <div
                    ref={dragProvider.innerRef}
                    {...dragProvider.draggableProps}
                    {...dragProvider.dragHandleProps}
                    className={wrapperClassName}
                >
                    <Droppable droppableId={props.taskGroup.id} type={DroppableKind.Group}>
                        {(dropProvider) => (
                            <div {...dropProvider.droppableProps} ref={dropProvider.innerRef}>
                                {props.taskGroup.tasks.map((task, taskIndex) => (
                                    <TaskItemComponent
                                        key={task.id}
                                        index={taskIndex}
                                        task={task}
                                    />
                                ))}
                                {dropProvider.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
