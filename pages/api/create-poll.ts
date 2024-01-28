'use server';
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import { revalidatePath } from "next/cache";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db();
    const allPolls = db.collection('all-polls');

    await allPolls.insertOne(req.body)
    // revalidatePath('/');
    client.close();
    return res.status(200).json({ status: 'ok' });
};
