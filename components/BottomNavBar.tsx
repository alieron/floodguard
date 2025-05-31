import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar() {
  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View className="flex-row justify-between items-center bg-blue-500 px-6 pt-3 pb-10 border-t border-gray-200">
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
