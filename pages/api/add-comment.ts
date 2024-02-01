'use server';
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const commentToBeAdded = req.body;
    const pollId = commentToBeAdded.pollId;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const commentsDB = db.collection('comments');

    const commentsForPoll = await commentsDB.findOne({ pollId: pollId }) || null;

    if (commentsForPoll) { // if comments exist for a poll already
        const { comments = [] } = commentsForPoll;
        comments.unshift(commentToBeAdded);
        await commentsDB.updateOne(
            { pollId: pollId },
            { $set: { pollId, comments } },
        )
    } else {
        await commentsDB.insertOne({ pollId, comments: [commentToBeAdded] });
    }

    client.close();
    return res.status(200).json({ status: 'ok' });
};
