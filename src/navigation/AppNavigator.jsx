import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "../screens/Auth/Login/";
import Register from "../screens/Auth/Register/";

import Dashboard from "../screens/Dashboard/";
import Sales from "../screens/Sales/";
import Clients from "../screens/Clients/";
import Inventory from "../screens/Inventory/";
import Reports from "../screens/Reports/";
import Settings from "../screens/Settings/";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Public Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* Future Private Screens */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Sales" component={Sales}/>
        <Stack.Screen name="Clients" component={Clients}/>
        <Stack.Screen name="Inventory" component={Inventory}/>
        <Stack.Screen name="Reports" component={Reports}/>
        <Stack.Screen name="Settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
