'use server';
import { Comment, CommentId } from "@/utils/types";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// 1. get the poll object from comments collection
// 2. get the comment from comment {} using parentCommentId
// 3. push the reply

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { pollId, reply: replyToBeAdded } = req.body;
    const { parentCommentId } = replyToBeAdded;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const commentsDB = db.collection('comments');

    const commentObjectForPoll = await commentsDB.findOne({ pollId: pollId });

    const parentComment = (commentObjectForPoll?.comments as { [key: CommentId]: Comment })[parentCommentId];
    parentComment.children[replyToBeAdded.id] = replyToBeAdded;

    await commentsDB.updateOne(
        { pollId: pollId },
        { $set: { pollId, comments: commentObjectForPoll?.comments } }
    )

    client.close();
    return res.status(200).json({ status: 'ok' });
};
