import { ID, Client, Storage, Databases, Models, Query } from "react-native-appwrite";

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
	reportedAt: number,
	description: string,
	location: string,
	imageUrls: string[],
} & Models.Document;

const collectionIds: Record<keyof CollectionTypes, string> = {
	reports: "6840950c000db6602668",
	warnings: "6841b0bf0032204d18cb",
};

type CollectionTypes = {
	reports: Report,
	warnings: Report,
};

export const addDocument = async <T extends keyof CollectionTypes>(
	collectionName: T,
	document: Omit<CollectionTypes[T], keyof Models.Document>
) => {
	return await databases.createDocument(
		APPWRITE_DATABASE_ID,
		collectionIds[collectionName],
		ID.unique(),
		document
	) as CollectionTypes[T];
};

export const recentDocuments = async <T extends keyof CollectionTypes>(
	collectionName: T
) => {
	return await databases.listDocuments(
		APPWRITE_DATABASE_ID,
		collectionIds[collectionName]
	) as { documents: CollectionTypes[T][], total: number };
};

export const getDocumentByID = async <T extends keyof CollectionTypes>(
	collectionName: T,
	id: string
) => {
	return await databases.getDocument(
		APPWRITE_DATABASE_ID,
		collectionIds[collectionName],
		id
	) as CollectionTypes[T];
}
