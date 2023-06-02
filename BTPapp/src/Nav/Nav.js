import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home/Home';
import Settings from '../Settings/Settings';

const Tab = createBottomTabNavigator();

const Nav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={size} />
                        ),
                    }}
                    name="Settings"
                    component={Settings}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Nav;