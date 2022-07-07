import { MongoClient } from "mongodb";
import { NextPage } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import { Context } from "react";
import { Exercise } from "../../components/exercise/ExerciseItem";
import ExerciseList from "../../components/exercise/ExerciseList";

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
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const exerciseCollection = db.collection("exercises");

  const exercises = (await exerciseCollection.find().toArray()).map(exercise => {
    return {
      id: exercise._id.toString(),
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
    };
  });

  const propsData: Props = {
    exercises: exercises,
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
