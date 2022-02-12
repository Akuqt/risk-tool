import React, { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button } from "react-native";
import { RootState } from "../../redux";
import { setWatch } from "../../redux/watch";
import { clearUser } from "../../redux/user";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VIForegroundService from "@voximplant/react-native-foreground-service";
import Geolocation from "react-native-geolocation-service";

type Props = NativeStackScreenProps<
  {
    Login: undefined;
  },
  "Login"
>;

export const Profile: React.FC<Props> = ({ navigation }) => {
  const { watchId } = useSelector(
    (state: RootState) => state.watchReducer.data,
  );
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err: any) => err);
  }, []);

  const removeLocationUpdates = useCallback(() => {
    if (watchId !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId);
      dispatch(setWatch({ watchId: null }));
    }
  }, [dispatch, stopForegroundService, watchId]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 120,
      }}
    >
      <Text>Name: {user.name}</Text>
      <Text>Role: {user.role}</Text>
      <Text>ID: {user.id}</Text>

      <Button
        title="Log out"
        onPress={() => {
          dispatch(clearUser());
          removeLocationUpdates();
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};
