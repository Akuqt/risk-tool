import React, { useState } from "react";
import { destinationIcon, originIcon } from "assets";
import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  Switch,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MapView } from "components/src/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Map: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);

  const [settings, setSettings] = useState(false);
  const [googleTL, setGoogleTL] = useState(false);
  const [wazeTL, setWazeTL] = useState(false);
  const [wazeTA, setWazeTA] = useState(false);
  const { height, width } = useWindowDimensions();

  return (
    <>
      <View
        style={{
          zIndex: 999,
          position: "absolute",
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 4,
            left: settings ? width / 2 : 4,
            zIndex: 2,
          }}
          onPress={() => setSettings((c) => !c)}
        >
          {settings ? (
            <Ionicons color="#000000" size={30} name="close-outline" />
          ) : (
            <Ionicons color="#000000" size={30} name="options-outline" />
          )}
        </TouchableOpacity>
        <View
          style={{
            width: settings ? width / 2 : 0,
            height,
            backgroundColor: "#c4c4c4ac",
          }}
        >
          {settings && (
            <View style={{ padding: 5, marginTop: 20 }}>
              <View
                style={{
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#000000" }}
                  onPress={() => setGoogleTL((c) => !c)}
                >
                  Google Traffic Layer
                </Text>
                <Switch
                  thumbColor="#ffffff"
                  trackColor={{ false: "#eb4242", true: "#0ca82e" }}
                  value={googleTL}
                  onValueChange={() => setGoogleTL((c) => !c)}
                />
              </View>
              <View
                style={{
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#000000" }}
                  onPress={() => setWazeTL((c) => !c)}
                >
                  Waze Traffic Layer
                </Text>
                <Switch
                  thumbColor="#ffffff"
                  trackColor={{ false: "#eb4242", true: "#0ca82e" }}
                  value={wazeTL}
                  onValueChange={() => setWazeTL((c) => !c)}
                />
              </View>
              <View
                style={{
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#000000" }}
                  onPress={() => setWazeTA((c) => !c)}
                >
                  Waze Traffic Alerts
                </Text>
                <Switch
                  thumbColor="#ffffff"
                  trackColor={{ false: "#eb4242", true: "#0ca82e" }}
                  value={wazeTA}
                  onValueChange={() => setWazeTA((c) => !c)}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <MapView
        googleTrafficLayer={googleTL}
        wazeAlertLayer={wazeTA}
        wazeTrafficLayer={wazeTL}
        markers={[
          {
            coords: {
              latitude: user?.company.lat,
              longitude: user?.company.lng,
            },
            info: {
              address: user?.company.address,
              name: user?.company.name,
            },
            icon: originIcon,
          },
          {
            coords: {
              latitude: user?.route[user?.route.length - 1].lat,
              longitude: user?.route[user?.route.length - 1].lng,
            },
            info: {
              address: user?.company.address,
            },
            icon: destinationIcon,
          },
        ]}
        polys={[
          user?.route.map((coord) => ({
            latitude: coord.lat,
            longitude: coord.lng,
          })),
        ]}
      />
    </>
  );
};
