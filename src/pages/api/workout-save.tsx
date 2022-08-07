import { NextApiRequest, NextApiResponse } from "next";
import { saveWorkoutData } from "../../firebase/firebase-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const workoutData = req.body;

    const result = await saveWorkoutData(workoutData);

    res.status(201).json(result);
};

export default handler;
