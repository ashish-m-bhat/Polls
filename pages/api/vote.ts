import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const modifiedPoll = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const allPolls = db.collection('all-polls');

    await allPolls.updateOne({ id: modifiedPoll.id }, {
        $set: {
            voteCount: modifiedPoll.voteCount,
            options: modifiedPoll.options
        }
    });

    client.close();
    return res.status(200).json({ status: 'ok' });
}