import { Text, View } from 'react-native';

export default function SubmitReport() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-300">
      <Text className="text-center text-black text-lg">
        SUBMIT A REPORT
      </Text>
      <View className="bg-white w-10/12 h-1/5 rounded-2xl">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white">Step 1: Upload image</Text>
      </View>
    </View>
  );
}