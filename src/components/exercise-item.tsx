import { FunctionComponent } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

export interface Exercise {
  id: string;
  name: string;
  reps?: number;
  sets?: number;
  rest?: string;
}

interface Props extends Exercise {
  index: number;
};

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="p-4 w-full m-auto bg-white border shadow-sm flex flex-col items-center font-semibold">
            <p className="text-xl text-teal-600">{props.name}</p>
            <p>
              {props.sets} x {props.reps}
            </p>
            <p>{props.rest ? `${props.rest} rest` : ''}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseItem;
