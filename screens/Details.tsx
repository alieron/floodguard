import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function ReportScreen({ navigation, route }: any) {
  const [report, setReport] = useState();
  const { id, type }: { id: string, type: string } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: type.charAt(0).toUpperCase() + type.slice(1)
    })
  }, [navigation, type])

  return (
    <View className="flex-1 bg-white mb-20">
      <Text>{id}</Text>
    </View>
  );
}
