import { MongoClient, ObjectId } from "mongodb";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import ExerciseDetails from "../../components/exercise/ExerciseDetails";
import { Exercise } from "../../components/exercise/ExerciseItem";

type Props = {
  exercise: Exercise;
}

const ExerciseDetailPage: NextPage<Props> = (props: Props) => {

  return (
    <ExerciseDetails {...props.exercise} />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const exerciseCollection = db.collection("exercises");
  const exerciseIds = await exerciseCollection.find().project({ _id: 1 }).toArray();

  const pathsData = exerciseIds.map((exercise) => { return { params: { exerciseId: exercise._id.toString() } } });
  client.close();

  return {
    paths: pathsData,
    fallback: false,  // is the paths prop (not) exhaustive?
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const exerciseId = context.params?.exerciseId;

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const exerciseCollection = db.collection("exercises");
  const exercise = await exerciseCollection.findOne({ _id: new ObjectId(exerciseId?.toString()) });

  client.close();

  return {
    props: { exercise: exercise ? { ...exercise, _id: exerciseId } : null }
  }
};

export default ExerciseDetailPage;
