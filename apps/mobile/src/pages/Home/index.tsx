import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../hooks";
import { RootState } from "../../redux";
import { Location } from "./Location";
import { saveRMA } from "../../redux/user";
import { Alerts } from "./Alerts";
import { Map } from "./Map";

const Tab = createBottomTabNavigator();

export const Home: React.FC = () => {
  const socket = useSocket();
  const driver = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("driver:route", ({ id, data }) => {
      if (driver.id === id) {
        dispatch(saveRMA({ ...data }));
      }
    });
  }, [driver, socket, dispatch]);

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
          } else if (route.name === "Alerts") {
            iconName = focused ? "notifications" : "notifications-outline";
          }

          return <Ionicons name={iconName || ""} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
        },
      })}
    >
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Alerts" component={Alerts} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};
