import './index.css';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import FloodMap from './screens/FloodMap';
import FloodBot from './screens/FloodBot';
import SubmitReport from './screens/SubmitReport';
import Settings from './screens/Settings';
import BottomNavBar from './components/BottomNavBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={() => <BottomNavBar />} // remove and add BottomNavBar to select screens if there are other screens u dont want to have navbar on
      >
        {/* Default screen */}
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="FloodMap" component={FloodMap}/>
        <Tab.Screen name="SubmitReport" component={SubmitReport}/>
        <Tab.Screen name="FloodBot" component={FloodBot}/>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
