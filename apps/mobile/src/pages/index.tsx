import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Profile } from "./Profile";
import { Login } from "./Login";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();

export const Pages: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!user.id ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
