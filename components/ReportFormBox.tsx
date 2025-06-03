import { View, Text } from "react-native";
import { ReactNode } from "react";

interface ReportFormBoxProps {
  headerText: string;
  subtitle: string;
  children: ReactNode;
}

export default function ReportFormBox({
  headerText,
  subtitle,
  children,
}: ReportFormBoxProps) {
  return (
      <View className="bg-white w-10/12 h-1/4 rounded-2xl m-5">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white">
          {headerText}
        </Text>
        <View className="items-center h-full w-full">
          <Text className="p-2">
            {subtitle}
          </Text>
          <View className="rounded-2xl ring-black ring-2 w-11/12 h-3/5 justify-center items-center">
            {children}
          </View>
        </View>
      </View>
  );
}
