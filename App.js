import "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "./src/screens/ChatList";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          regular: require("./assets/fonts/Poppins-Regular.ttf"),
          bold: require("./assets/fonts/Poppins-Bold.ttf"),
          boldItalic: require("./assets/fonts/Poppins-BoldItalic.ttf"),
          italic: require("./assets/fonts/Poppins-Italic.ttf"),
          semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
          semiBoldItalic: require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
          medium: require("./assets/fonts/Poppins-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Poppins-MediumItalic.ttf"),
          thin: require("./assets/fonts/Poppins-Thin.ttf"),
          thinItalic: require("./assets/fonts/Poppins-ThinItalic.ttf"),
          light: require("./assets/fonts/Poppins-Light.ttf"),
          lightItalic: require("./assets/fonts/Poppins-LightItalic.ttf"),
        });
      } catch (error) {
        console.log.error("Error loading fonts: ", error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppIsLoaded(true);
    }, 2000);
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onReady={onLayout}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ChatList} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
