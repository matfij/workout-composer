import { NextPage } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import { Context } from "react";
import { Exercise } from "../../components/exercise/ExerciseItem";
import ExerciseList from "../../components/exercise/ExerciseList";

export const DUMMY_EXERCISES = [
  { name: "Pull-ups", sets: 5, reps: 10 },
  { name: "Push-ups", sets: 4, reps: 24 },
  { name: "Squats", sets: 3, reps: 8 },
  { name: "Dips", sets: 2, reps: 6 },
];

type Props = {
  exercises: Exercise[];
}

const ExercisesPage: NextPage<Props> = (props: Props) => {
  
  // executed after first component render cycle - not visible for search bots
  // const [exercises, setExercises] = useState<Exercise[]>([]);
  // useEffect(() => {
  //   setExercises(DUMMY_EXERCISES);
  // }, []);

  return (
    <>
      <ExerciseList exercises={props.exercises} />
    </>
  );
};

// called before component rendering - preparung required props (async) and then renders component
// this code is executed on server side - backend capabilities
export const getStaticProps = async () => {
  const propsData: Props = {
    exercises: DUMMY_EXERCISES,
  };
  return { 
    props: propsData,
    revalidate: 60,
  };
};

// runs each time a request is sent to the server to serve 
// export const getServerSideProps = async (context: BaseContext) => {
//   const req = context.req;
//   const res = context.res;
//   console.log(req, res);  // logged on the server side

//   const propsData: Props = {
//     exercises: DUMMY_EXERCISES,
//   };
//   return { 
//     props: propsData,
//   };
// };

export default ExercisesPage;
