import { View, Text } from "react-native";

interface NotificationBoxProps {
  headerText: string;
  subheading: string;
  content: string;
  timeStamp: string;
}

export default function NotificationBox({
  headerText,
  subheading,
  content,
  timeStamp
}: NotificationBoxProps) {
  return (
      <View className="bg-white w-96 rounded-2xl m-5 pb-2">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white font-bold">
          {headerText}
        </Text>
        <View className="">
          <Text className="px-5 py-3 font-bold text-xl">
            {subheading}
          </Text>
          <Text className="text-sm px-5">
            {content}
          </Text>
          <Text className="text-xs text-right pr-3 text-gray-600">
            {timeStamp}
          </Text>
        </View>
      </View>
  );
}