import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Open-Sans-Bold": require("./src/assets/fonts/Open-Sans/OpenSans-Bold.ttf"),
    "Open-Sans": require("./src/assets/fonts/Open-Sans/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
