import React, { useEffect } from "react";
import { ButtonsContainer, Container } from "./Elements";
import { useDispatch, useSelector } from "react-redux";
import { UserCard, DataCard, Btn } from "components/src/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setLocation } from "../../redux/location";
import { useLocation } from "../../hooks";
import { RootState } from "../../redux";
import { useSocket } from "../../hooks/useSocket";
import { Data } from "types";

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
    socket?.emit("save:driver:location", {
      id: user.id || "62320bbb38160372eac74c52",
      ...data,
    });
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
          bold
          label="TRACK"
          bg="#FF6347"
          onPress={getLocationUpdates}
          disabled={watchId !== null}
        />
        <Btn
          bold
          label="UNTRACK"
          bg="#acacac"
          onPress={removeLocationUpdates}
          disabled={watchId === null}
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
