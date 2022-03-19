import { createClient } from "@prismicio/client";
// import fetch from "node-fetch";

export function getPrismicClient() {
	const client = createClient(
		process.env.PRISMIC_ENDPOINT,
		{
			// fetch: fetch,
			accessToken: process.env.PRISMIC_ACCESS_TOKEN,
			// This defines how you will structure URL paths in your project.
			// Update the types to match the Custom Types in your project, and edit
			// the paths to match the routing in your project.
			//
			// If you are not using a router in your project, you can change this
			// to an empty array or remove the option entirely.
			// routes: [
			// 	{
			// 		type: 'hom-ignews-post',
			// 		path: '/:uid',
			// 	},
			// ],
		}
	)

	return client;
}