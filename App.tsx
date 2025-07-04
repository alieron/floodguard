import './index.css';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Notifications from './screens/Notifications';
import FloodBot from './screens/FloodBot';
import SubmitReport from './screens/SubmitReport';
import Settings from './screens/Settings';
import Details from './screens/Details';
import BottomNavBar from './components/BottomNavBar';

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			{/* remove the tabBar prop and add BottomNavBar to select screens if there are other screens u dont want to have navbar on */}
			<Tab.Navigator
				tabBar={(props) => <BottomNavBar {...props}/>}
			>
				{/* Default screen */}
				<Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
				<Tab.Screen name="Notifications" component={Notifications} />
				<Tab.Screen name="SubmitReport" options={{ title: "Submit a Report" }} component={SubmitReport} />
				<Tab.Screen name="FloodBot" component={FloodBot} />
				<Tab.Screen name="Settings" component={Settings} />
				<Tab.Screen name="Details" component={Details} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
