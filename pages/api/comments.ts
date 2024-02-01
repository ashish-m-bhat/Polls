import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pollId = req.query.pollId;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const commentsDB = db.collection('comments');

    const commentsForPoll = await commentsDB.findOne({ pollId: pollId });
    client.close();

    return res.status(200).end(JSON.stringify(commentsForPoll?.comments || []));
}
