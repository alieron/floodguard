import { Text, View, ScrollView } from "react-native";
import NotificationBox from "../components/NotificationBox";

export default function SubmitReport() {
  return (
    <View className="flex-1 bg-blue-300 px-5 pt-20">
      <View className="flex-row justify-center gap-3 mb-6">
        <Text className="text-center text-black text-3xl font-bold">NOTIFICATIONS</Text>
      </View>

      <ScrollView className="flex-1 w-full mb-24">
      <NotificationBox
        headerText="Warning"
        subheading="Flash flood at King's Road"
        content="Flash flood occurred at King’s Road (from Prince Road to Lutheran Road). Please avoid the area. PUB officers have been deployed to render assistance."
        timeStamp="Just now"
      >
      </NotificationBox>
            <NotificationBox
        headerText="Warning"
        subheading="Flash flood at King's Road"
        content="Flash flood occurred at King’s Road (from Prince Road to Lutheran Road). Please avoid the area. PUB officers have been deployed to render assistance."
        timeStamp="Just now"
      >
      </NotificationBox>
            <NotificationBox
        headerText="Warning"
        subheading="Flash flood at King's Road"
        content="Flash flood occurred at King’s Road (from Prince Road to Lutheran Road). Please avoid the area. PUB officers have been deployed to render assistance."
        timeStamp="Just now"
      >
      </NotificationBox>
            <NotificationBox
        headerText="Warning"
        subheading="Flash flood at King's Road"
        content="Flash flood occurred at King’s Road (from Prince Road to Lutheran Road). Please avoid the area. PUB officers have been deployed to render assistance."
        timeStamp="Just now"
      >
      </NotificationBox>
      </ScrollView>
    </View>
  );
}
