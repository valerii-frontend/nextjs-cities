import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

import { useRouter } from "next/router";

import Head from "next/head";

const NewMeetUpPage = () => {
	const router = useRouter();
	async function addMeetupHandler(enteredData) {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredData),
			headers: {
				"Content-type": "application/json",
			},
		});

		const data = await response.json();
		router.push("/");
	}

	return (
		<>
			<Head>
				<title>Poland | Add new city</title>
			</Head>
			<NewMeetUpForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetUpPage;
