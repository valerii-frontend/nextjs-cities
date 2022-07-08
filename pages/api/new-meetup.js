import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method == "POST") {
		const data = req.body;

		const client = MongoClient.connect(
			"mongodb+srv://lvaldev:Gua60OitMsaV5yWR@cluster0.ujit78b.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = (await client).db();
		const meetUpsCollection = db.collection("meetups");
		const result = await meetUpsCollection.insertOne(data);
		console.log(result);

		(await client).close();

		res.status(201).json({ message: "Meetup inserted!" });
	}
}

export default handler;
