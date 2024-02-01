'use server';
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// 1. check if an object already exists with the pollId
// 2. if yes, add the comment by creating a new entry in the comments object
// 3. If not, create a new object { pollId: pollId, comments: { commentId: comment } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const commentToBeAdded = req.body;
    const pollId = commentToBeAdded.pollId;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const commentsDB = db.collection('comments');

    const commentsForPoll = await commentsDB.findOne({ pollId: pollId }) || null;

    if (commentsForPoll) { // if comments exist for a poll already
        const { comments = {} } = commentsForPoll;
        comments[commentToBeAdded.id] = commentToBeAdded;
        await commentsDB.updateOne(
            { pollId: pollId },
            { $set: { pollId, comments } },
        )
    } else {
        await commentsDB.insertOne({ pollId, comments: { [commentToBeAdded.id]: commentToBeAdded } });
    }

    client.close();
    return res.status(200).json({ status: 'ok' });
};
