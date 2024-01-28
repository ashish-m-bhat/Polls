import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const allPolls = db.collection('user-votes');

    const result = await allPolls.findOne({ email: email }) || {}; // polls : { pollId1: optionId1, ..., pollIdN: optionId1 }
    client.close();
    return res.status(200).end(JSON.stringify(result));
}
