import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";

// Screens
import Login from "../screens/Auth/Login/";
import Register from "../screens/Auth/Register/";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ForgotPasswordCode from "../screens/Auth/ForgotPasswordCode";
import ChangePassword from "../screens/Auth/ChangePassword";

import Dashboard from "../screens/Dashboard/";
import Sales from "../screens/Sales/";
import Clients from "../screens/Clients/";
import Inventory from "../screens/Inventory/";
import Reports from "../screens/Reports/";
import Settings from "../screens/Settings/";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#4db8a8" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // ========== Private Routes ==========
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Sales" component={Sales}/>
            <Stack.Screen name="Clients" component={Clients}/>
            <Stack.Screen name="Inventory" component={Inventory}/>
            <Stack.Screen name="Reports" component={Reports}/>
            <Stack.Screen name="Settings" component={Settings}/>
          </>
        ) : (
          // ========== Public Routes ==========
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}