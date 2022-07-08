import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Poland | HomePage</title>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

export async function getStaticProps() {
	const client = MongoClient.connect(
		"mongodb+srv://lvaldev:Gua60OitMsaV5yWR@cluster0.ujit78b.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetUpsCollection = db.collection("meetups");

	const meetups = await meetUpsCollection.find().toArray();

	(await client).close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
