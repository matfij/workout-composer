"use client";

import { Droppable } from "@hello-pangea/dnd";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";

import { Day, DroppableKind } from "../types";
import { useWorkoutStore } from "../workout-store";
import { TaskFormComponent } from "./task-form-component";
import { TaskGroupComponent } from "./task-group-component";

import style from "./day-item-component.module.scss";

type DayItemComponentProps = {
    day: Day;
};

export const DayItemComponent = (props: DayItemComponentProps) => {
    const { isLocked, isDragging, editDay, removeDay } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [name, setName] = useState(props.day.name);
    const [isEditingName, setIsEditingName] = useState(false);

    const showActions = !isLocked && !isDragging;

    const onStartEditDay = () => {
        if (!isLocked) {
            setIsEditingName(true);
        }
    };

    const onEditNameKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onEditNameBlur();
            return;
        }
        if (event.key !== "Enter" || !name) {
            return;
        }
        editDay({ ...props.day, name });
        setIsEditingName(false);
    };

    const onEditNameBlur = () => {
        setName(props.day.name);
        setIsEditingName(false);
    };

    return (
        <>
            <section className={style.dayWrapper} onBlur={onEditNameBlur}>
                {!isEditingName && (
                    <h3 onDoubleClick={onStartEditDay} className="subtitle center">
                        {props.day.name}
                    </h3>
                )}
                {isEditingName && (
                    <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(event) => onEditNameKeyDown(event)}
                        className={`${style.dayInput} subtitle light`}
                    />
                )}
                <Droppable droppableId={props.day.name} type={DroppableKind.Day}>
                    {(dropProvider) => (
                        <>
                            <div {...dropProvider.droppableProps} ref={dropProvider.innerRef}>
                                {props.day.taskGroups.map((group, groupIndex) => (
                                    <TaskGroupComponent
                                        key={group.id}
                                        index={groupIndex}
                                        taskGroup={group}
                                    />
                                ))}
                            </div>
                            {dropProvider.placeholder}
                        </>
                    )}
                </Droppable>
                {showActions && (
                    <div className={style.actionsBtn}>
                        <div onClick={() => setShowTaskForm(true)} className={style.actionBtn}>
                            <Image
                                src="/icons/add-icon-light.svg"
                                alt="add"
                                width={38}
                                height={38}
                                style={{ paddingTop: "8px" }}
                            />
                        </div>
                        <div
                            onDoubleClick={() => removeDay(props.day.id)}
                            className={style.actionBtn}
                        >
                            <Image
                                src="/icons/remove-icon.svg"
                                alt="remove"
                                width={36}
                                height={36}
                            />
                        </div>
                    </div>
                )}
                {!showActions && <div style={{ marginTop: "46px" }}></div>}
            </section>
            {showTaskForm && (
                <TaskFormComponent
                    dayName={props.day.name}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </>
    );
};
