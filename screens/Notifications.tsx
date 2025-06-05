import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import NotificationCard, { NotificationCardProps } from '../components/NotificationCard';
import { recentDocuments } from '../utils/appwrite';

const mockNotifications: any[] = [
	{
		id: "1",
		type: "warning",
		images: [
			"https://placekitten.com/800/400",
			"https://placekitten.com/801/400",
		],
		description: "Flash flood warning near King’s Road.",
		timestamp: 1717555200000,
	},
	{
		id: "2",
		type: "report",
		images: [
			"https://placekitten.com/802/400",
			"https://placekitten.com/803/400",
			"https://placekitten.com/804/400",
		],
		description: "Water levels rising outside my flat.",
		timestamp: 1717641600000,
	},
];

export default function NotificationsPage() {
	const [notifications, setNotifications] = useState<NotificationCardProps[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const getNotifications = async () => {
		const toCardProps = (type: "warning" | "report", data: any) => {
			return {
				type,
				id: data.$id,
				description: data.description,
				reportedAt: data.reportedAt,
				imageUrls: data.imageUrls
			} as NotificationCardProps;
		};

		const notifs: NotificationCardProps[] = [];
		notifs.push(...(await recentDocuments("reports")).documents.map((data) => toCardProps("report", data)));
		notifs.push(...(await recentDocuments("warnings")).documents.map((data) => toCardProps("warning", data)));
		// console.log(notifs) // Testing
		notifs.sort((a, b) => a.reportedAt - b.reportedAt);
		setNotifications(notifs);
	};

	const handleRefresh = () => {
		setIsRefreshing(true);
		getNotifications();
		console.log(notifications);
		setIsRefreshing(false);
	}

	useEffect(() => {
		getNotifications();
	}, []);

	return (
		<View className="flex-1 bg-sky-200 px-4 mb-20">
				<FlatList
					data={notifications}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <NotificationCard item={item} />}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
					className="pt-4"
				/>
		</View>
	);
}
