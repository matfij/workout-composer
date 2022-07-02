import { FunctionComponent } from "react";

type Props = {
  name: string;
  reps: number;
  sets: number;
};

const Exercise: FunctionComponent<Props> = (props: any) => {
  return <>{props.name}</>;
};

export default Exercise;
