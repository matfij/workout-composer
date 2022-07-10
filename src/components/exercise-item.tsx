import { FunctionComponent } from 'react';

export interface Exercise {
  name: string;
  reps?: number;
  sets?: number;
  rest?: string;
}

type Props = Exercise;

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="p-4 w-full m-auto bg-white border shadow-sm flex flex-col items-center font-semibold">
      <p className="text-xl text-teal-600">{props.name}</p>
      <p>
        {props.sets} x {props.reps}
      </p>
      <p>{props.rest ? `${props.rest} rest` : ''}</p>
    </div>
  );
};

export default ExerciseItem;
