import { useState } from 'react';
import { View, Text } from 'react-native';

export default function ReportScreen({ navigation, route }: any) {
  const [report, setReport] = useState();
  const id = route.params.id;

  return (
    <View className="flex-1 bg-white mb-20">
      <Text>{id}</Text>
    </View>
  );
}
