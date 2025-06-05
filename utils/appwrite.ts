import { ID, Client, Storage, Databases, Query } from "react-native-appwrite";

import {
	APPWRITE_PROJECT_ID,
	APPWRITE_DATABASE_ID,
	APPWRITE_IMAGE_BUCKET_ID
} from '@env';


const client = new Client()
	.setEndpoint("https://fra.cloud.appwrite.io/v1")
	.setProject(APPWRITE_PROJECT_ID)

const storage = new Storage(client);
const databases = new Databases(client);

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

type Report = {
	id: string,
	reportedAt: number,
	description: string,
	location: string,
	imageUrls: string[],
}

const collectionIds: Record<keyof CollectionTypes, string> = {
	reports: "6840950c000db6602668",
};

type CollectionTypes = {
	reports: Report,
};

export const addDocument = async <T extends keyof CollectionTypes>(
	collectionName: T,
	document: Omit<CollectionTypes[T], 'id'>
) => {
	return databases.createDocument(
		APPWRITE_DATABASE_ID,
		collectionIds[collectionName],
		ID.unique(),
		document
	);
};

export const recentDocuments = async <T extends keyof CollectionTypes>(
	collectionName: T
) => {
	const result = await databases.listDocuments(
		APPWRITE_DATABASE_ID,
		collectionIds[collectionName],
		[
			Query.orderDesc('reportedAt')
		]
	);
	return result.documents.map((doc) => {
		return {
			id: doc.$id,
			...(doc as unknown as Omit<CollectionTypes[T], 'id'>),
		} as CollectionTypes[T]
	});
};
