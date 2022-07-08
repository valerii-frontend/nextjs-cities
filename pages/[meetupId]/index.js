import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetailsPage = (props) => {
	return (
		<>
			<Head>
				<title>Poland | {props.meetupData.title}</title>
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				description={props.meetupData.description}
				address={props.meetupData.address}
			/>
		</>
	);
};

export async function getStaticPaths(props) {
	const client = MongoClient.connect(
		"mongodb+srv://lvaldev:Gua60OitMsaV5yWR@cluster0.ujit78b.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetUpsCollection = db.collection("meetups");

	const meetups = await meetUpsCollection.find({}, { _id: 1 }).toArray();
	(await client).close();
	return {
		fallback: "blocking",
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = MongoClient.connect(
		"mongodb+srv://lvaldev:Gua60OitMsaV5yWR@cluster0.ujit78b.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetUpsCollection = db.collection("meetups");

	const selectedMeetup = await meetUpsCollection.findOne({ _id: ObjectId(meetupId) });
	(await client).close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetailsPage;
