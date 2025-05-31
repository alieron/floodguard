import './index.css';
import { Text, View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-center text-red-500 text-lg">
        Open up App.tsx to start working on your app!
      </Text>
      <BottomNavBar />
    </View>
  );
}
