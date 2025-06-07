import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export interface NotificationCardProps {
  id: string;
  type: "warning" | "report";
  imageUrl: string;
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

const NotificationCard = ({ item }: { item: NotificationCardProps }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const typeLabel = item.type === "warning"
    ? (<><Ionicons name="warning" size={20} color="red" /><Text>Warning</Text></>)
    : (<><Ionicons name="pin" size={20} color="blue" /><Text>Report</Text></>)

  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
      onPress={() => navigation.navigate("Details", { id: item.id, type: item.type })}
    >
      <View className="flex flex-row items-center text-lg font-bold mb-2">{typeLabel}</View>
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          className="rounded-lg"
          resizeMode="cover"
          style={{ width: screenWidth - 56, height: screenWidth - 56 }} // required for pagination width
        />
      )}
      <Text className="mt-3 text-base">{item.description}</Text>
      <Text className="mt-1 text-xs text-gray-500 text-right">
        {formatDate(item.reportedAt)}
      </Text>
    </Pressable>
  );
};

export default NotificationCard;
