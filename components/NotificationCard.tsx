import { useState } from 'react';
import { View, Text, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export interface NotificationCardProps {
	id: string;
	type: "warning" | "report";
	imageUrls: string[];
	description: string;
	reportedAt: number;
}

const formatDate = (ms: number) => {
	const date = new Date(ms);
	return date.toLocaleString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
};

const ImageSlider = ({ images }: { images: string[] }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
		setActiveIndex(newIndex);
	};

	return (
		<View className="w-full items-center">
			<ScrollView
				horizontal
				pagingEnabled
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				className="w-full"
			>
				{images.map((uri, index) => (
					<Image
						key={index}
						source={{ uri }}
						className="w-[calc(100vw-56px)] h-72 rounded-lg"
						resizeMode="cover"
						style={{ width: screenWidth - 56 }} // required for pagination width
					/>
				))}
			</ScrollView>
			{images.length > 1 && (
				<View className="flex-row justify-center mt-2">
					{images.map((_, i) => (
						<View
							key={i}
							className={`w-2 h-2 mx-1 rounded-full ${i === activeIndex ? "bg-blue-600" : "bg-gray-400"
								}`}
						/>
					))}
				</View>
			)}
		</View>
	);
};

const NotificationCard = ({ item }: { item: NotificationCardProps }) => {
	const typeLabel = item.type === "warning"
		? (<><Ionicons name="warning" size={20} color="red" /><Text>Warning</Text></>)
		: (<><Ionicons name="pin" size={20} color="blue" /><Text>Report</Text></>)

	return (
		<View className="bg-white rounded-2xl p-4 mt-4 shadow-sm">
			<View className="flex flex-row items-center text-lg font-bold mb-2">{typeLabel}</View>

			<ImageSlider images={item.imageUrls} />

			<Text className="mt-3 text-base">{item.description}</Text>
			<Text className="mt-1 text-xs text-gray-500 text-right">
				{formatDate(item.reportedAt)}
			</Text>
		</View>
	);
};

export default NotificationCard;
