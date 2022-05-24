import React, { useEffect } from "react";
import config from "../../config";
import { ButtonsContainer, Container } from "./Elements";
import { useDispatch, useSelector } from "react-redux";
import { UserCard, DataCard, Btn } from "components/src/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ToastAndroid } from "react-native";
import { Data, IError } from "types";
import { setLocation } from "../../redux/location";
import { useLocation } from "../../hooks";
import { clearRoute } from "../../redux/user";
import { RootState } from "../../redux";
import { useSocket } from "../../hooks/useSocket";
import { Post } from "services";

type Props = NativeStackScreenProps<
  {
    Profile: undefined;
  },
  "Profile"
>;

export const Location: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const { watchId } = useSelector(
    (state: RootState) => state.watchReducer.data,
  );
  const socket = useSocket();

  const {
    getLocation,
    getLocationUpdates,
    removeLocationUpdates,
    states: { location },
  } = useLocation((data: Data) => {
    if (user.active) {
      socket?.emit("save:driver:location", {
        id: user.id,
        ...data,
      });
    }
    dispatch(setLocation(data));
  }, 1000);

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
    return () => {
      removeLocationUpdates();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ButtonsContainer>
        <Btn
          width="30%"
          bold
          label="TRACK"
          bg="#FF6347"
          onPress={getLocationUpdates}
          disabled={watchId !== null || !user.active}
        />
        <Btn
          width="30%"
          bold
          label="UNTRACK"
          bg="#acacac"
          onPress={removeLocationUpdates}
          disabled={watchId === null}
        />
        <Btn
          width="30%"
          bold
          label="Complete"
          bg="#0ca82e"
          disabled={!user.active}
          onPress={async () => {
            removeLocationUpdates();
            const res = await Post<{ ok: boolean; error?: IError }>(
              config.apiUrl,
              "/path/end",
              {
                current: {
                  lat: location?.coords.latitude,
                  lng: location?.coords.longitude,
                },
                destination: {
                  lat: user.dlat,
                  lng: user.dlng,
                },
              },
              user.token,
            );
            if (res.data.ok) {
              dispatch(clearRoute());
              ToastAndroid.show("Route completed", ToastAndroid.SHORT);
            } else {
              ToastAndroid.show(
                `[${res.data.error?.code}]: ${res.data.error?.message}`,
                ToastAndroid.SHORT,
              );
            }
          }}
        />
      </ButtonsContainer>
      <UserCard
        img={`https://avatars.dicebear.com/api/${user.gender || "male"}/${
          user.id || "driverU"
        }.svg`}
        name={user.name || "Name"}
        lastname={user.lastname || "Lastname"}
        id={user.id || "6231ff99810c15ca985658ee"}
        role={user.role || "driver"}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <DataCard
        lat={location?.coords.latitude || 0}
        lng={location?.coords.longitude || 0}
        speed={location?.coords.speed || 0}
        tmp={location?.timestamp || 0}
      />
    </Container>
  );
};
