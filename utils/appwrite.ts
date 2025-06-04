import { ID, Client, Storage } from "react-native-appwrite";

import {
	APPWRITE_PROJECT_ID,
	APPWRITE_IMAGE_BUCKET_ID
} from '@env';


const client = new Client()
	.setEndpoint("https://fra.cloud.appwrite.io/v1")
	.setProject(APPWRITE_PROJECT_ID)

const storage = new Storage(client);

export const uploadImage = async (image: { name: string; type: string; size: number; uri: string; }) => {
	try {
		const response = await storage.createFile(
			APPWRITE_IMAGE_BUCKET_ID,
			ID.unique(),
			image
		);

		return storage.getFileView(
			APPWRITE_IMAGE_BUCKET_ID,
			response.$id
		);
	} catch (error) {
		console.log("Image failed to upload:", error);
		return Promise.reject(error);
	}
};
