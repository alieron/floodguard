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
      <View className="bg-white w-96 rounded-2xl m-5 pb-2">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white">
          {headerText}
        </Text>
        <View className="items-center">
          <Text className="p-2">
            {subtitle}
          </Text>
          <View className="min-h-40 border-black border rounded-2xl justify-center items-center w-11/12">
            {children}
          </View>
        </View>
      </View>
  );
}
