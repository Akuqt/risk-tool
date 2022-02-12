import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Location } from "./Location";
import { Map } from "./Map";

const Tab = createBottomTabNavigator();

export const Home: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Location"
      backBehavior="none"
      sceneContainerStyle={{
        backgroundColor: "#ffffff",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Location") {
            iconName = focused ? "navigate" : "navigate-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          }
          return <Ionicons name={iconName || ""} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
        },
      })}
    >
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};
