import React, { useState } from "react";
import { Alert, Image, Text, TextInput, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { addDocument, uploadImage } from "../utils/appwrite";

export default function SubmitReport() {
	const [description, setDescription] = useState("");
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [location, setLocation] = useState<Location.LocationObject | null>(null);

	const uploadImageAssets = async (images: ImagePicker.ImagePickerAsset[]) => {
		try {
			setImageUrls([...imageUrls,
			...await Promise.all(
				images.map(async (image) => {
					const url = new URL(image.uri);
					// Handle native file preparation
					return uploadImage({
						name: url.pathname.split("/").pop()!,
						size: image.fileSize!,
						type: image.mimeType!,
						uri: url.href,
					}).then((url) => url.toString());
				})
			)
			]);
		} catch (e) {
			Alert.alert("Image upload failed");
		}
	}

	const pickImage = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) {
			Alert.alert("Permission required", "We need access to your media library.");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsMultipleSelection: true,
			selectionLimit: 5,
			quality: 0.5,
		});

		if (!result.canceled && result.assets.length > 0) {
			uploadImageAssets(result.assets);
		}
	};

	const takePhoto = async () => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert("Permission required", "We need access to your camera.");
			return;
		}
		const result = await ImagePicker.launchCameraAsync({
			allowsMultipleSelection: true,
			selectionLimit: 5,
			quality: 0.5,
		});

		if (!result.canceled && result.assets.length > 0) {
			uploadImageAssets(result.assets);
		}
	};

	const removeImage = (index: number) => {
		const newImages = imageUrls.filter((_, i) => i !== index);
		setImageUrls(newImages);
	};

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permission denied", "Location permission is required.");
			return;
		}
		const loc = await Location.getCurrentPositionAsync({});
		setLocation(loc);
	};

	const handleSubmit = () => {
		addDocument(
			'reports',
			{
				reportedAt: location?.timestamp!,
				description,
				location: JSON.stringify({ latitude: location?.coords.latitude, longitude: location?.coords.longitude }),
				imageUrls
			}
		)
			.then(() => {
				setDescription("");
				setImageUrls([]);
				setLocation(null);
				Alert.alert("Report submitted", "Thank you!");
			})
			.catch((e) => {
				console.log(e);
				Alert.alert("Failed to submit", e);
			});
	};

	return (
		<View className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View className="px-5 pt-2">
				{/* Description */}
				<Text className="mb-1 text-lg font-semibold">Description</Text>
				<TextInput
					className="border border-gray-400 rounded-lg p-3 h-32 text-base text-black"
					placeholder="Describe the situation..."
					multiline
					value={description}
					onChangeText={setDescription}
					maxLength={500}
				/>

				{/* Location */}
				<Text className="mt-5 mb-1 text-lg font-semibold">Location</Text>
				{location === null ? (
					<TouchableOpacity onPress={getLocation} className="bg-blue-600 rounded-lg p-3 mb-2">
						<Text className="text-white text-center">Use Current Location</Text>
					</TouchableOpacity>
				) : (
					<Text className="text-center p-3 mb-2">Location Collected</Text>
				)}

				{/* Image Upload */}
				<Text className="mt-5 mb-1 text-lg font-semibold">Images (max 5)</Text>
				<View className="flex-row justify-center gap-6 mb-2">
					<TouchableOpacity onPress={takePhoto} className="items-center">
						<Ionicons name="camera-outline" size={36} color="black" />
						<Text>Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={pickImage} className="items-center">
						<Ionicons name="image-outline" size={36} color="black" />
						<Text>Gallery</Text>
					</TouchableOpacity>
				</View>

				{/* Image Carousel */}
				{imageUrls.length > 0 && (
					<ScrollView horizontal className="mt-2 mb-4 pt-2">
						{imageUrls.map((url, index) => (
							<View key={index} className="relative mr-4">
								<Image source={{ uri: url }} className="w-40 h-32 rounded-lg border" />
								<TouchableOpacity
									className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
									onPress={() => removeImage(index)}
								>
									<Ionicons name="close" size={16} color="white" />
								</TouchableOpacity>
							</View>
						))}
					</ScrollView>
				)}
        </View>
			</TouchableWithoutFeedback>

			{/* Submit Button */}
			<View className="absolute bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
				<TouchableOpacity
					className="bg-green-600 rounded-xl p-4"
					onPress={handleSubmit}
				>
					<Text className="text-white text-center text-lg font-semibold">Submit Report</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
