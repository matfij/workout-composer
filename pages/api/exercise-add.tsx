import { NOTFOUND } from "dns";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const exerciseData = req.body;

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const exerciseCollection = db.collection("exercises");
  const result = await exerciseCollection.insertOne(exerciseData);

  client.close();

  res.status(201).json(result);
};

export default handler;
