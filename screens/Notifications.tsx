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
        headerText="Report Submitted"
        subheading="Report successfully submitted!"
        content="You submitted a report on 20 May 2025 at 15:00.
Location: Adam Road"
        timeStamp="2 days ago"
      >
      </NotificationBox>
            <NotificationBox
        headerText="Warning"
        subheading="Heavy rain in northeast regions"
        content="Heavy rain expected in northeast regions. A flash flood is expected to occur. Drive safely and stay updated wwith the FloodGuard app to adequately plan your journey."
        timeStamp="6 days ago"
      >
      </NotificationBox>
            <NotificationBox
        headerText="Warning"
        subheading="Heavy rain in western regions"
        content="Heavy rain expected in western regions. A flash flood is expected to occur. Drive safely and stay updated wwith the FloodGuard app to adequately plan your journey."
        timeStamp="1w ago"
      >
      </NotificationBox>
                  <NotificationBox
        headerText="Warning"
        subheading="Flash flood at Dunearn Road and Bukit Timah Road"
        content="Flash flood occurred at Dunearn Road and Bukit Timah Road (near King Albert Park). Please avoid the area. PUB officers have been deployed to render assistance."
        timeStamp="2w ago"
      >
      </NotificationBox>
      </ScrollView>
    </View>
  );
}
