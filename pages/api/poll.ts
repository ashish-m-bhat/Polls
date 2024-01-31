import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('req.query.pollId', req.query.pollId);

    const pollId = req.query.pollId;
    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const allPolls = db.collection('all-polls');

    const pollData = await allPolls.findOne({ id: pollId })
    client.close();

    return res.status(200).end(JSON.stringify(pollData));
}
