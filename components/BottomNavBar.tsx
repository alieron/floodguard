import { View, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ state, navigation }: BottomTabBarProps) {
  const currentScreen = state.routeNames[state.index]; 

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View className="flex-row justify-between items-center bg-blue-500 px-2 pb-7 border-t border-gray-200">
        <Pressable onPress={() => navigation.navigate('Home')} className="p-3">
          <Ionicons name={currentScreen === "Home" ? "home-sharp" : "home-outline"} size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Notifications')} className="p-3">
          <Ionicons name={currentScreen === "Notifications" ? "notifications" : "notifications-outline"} size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SubmitReport')} className="p-3">
          <Ionicons name={currentScreen === "SubmitReport" ? "add-circle" : "add-circle-outline"} size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('FloodBot')} className="p-3">
          <Ionicons name={currentScreen === "FloodBot" ? "chatbubble" : "chatbubble-outline"} size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Settings')} className="p-3">
          <Ionicons name={currentScreen === "Settings" ? "settings-sharp" : "settings-outline"} size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
