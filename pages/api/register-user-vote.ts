import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { poll, selectedOption, userEmail: email } = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const userVotes = db.collection('user-votes');

    const defaultObject = {
        email,
        poll_ids_list: [],
        option_ids_list: [],
    };

    const userDBEntry = await userVotes.findOne({ email: email }) || defaultObject;
    userDBEntry.poll_ids_list.push(poll.id);
    userDBEntry.option_ids_list.push(selectedOption.id);

    await userVotes.updateOne(
        { email: email },
        { $set: userDBEntry },
        { upsert: true }
    );

    client.close();
    return res.status(200).json({ status: 'ok' });
}
