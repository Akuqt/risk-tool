import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Select } from "components/src/native";
import { Post } from "services";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

export const Alerts: React.FC = () => {
  const [reason, setReason] = useState("");
  const [reset, setReset] = useState(false);
  const [description, setDescription] = useState("");

  const driver = useSelector((state: RootState) => state.userReducer.user);

  return (
    <ScrollView
      style={{
        display: "flex",
        marginTop: 10,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Alerts
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: 20, marginBottom: 4 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#909090",
          }}
        >
          Reason *
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: 4, marginBottom: 20 }}>
        <Select
          reset={reset}
          items={["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6"]}
          onSelect={(item) => {
            setReason(item);
          }}
        />
      </View>
      <View style={{ width: "100%", marginTop: 20, marginBottom: 4 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#909090",
          }}
        >
          Description
        </Text>
      </View>
      <TextInput
        multiline={true}
        style={{
          borderBottomWidth: 1,
          height: 40,
          fontSize: 16,
        }}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View
        style={{
          width: "100%",
          marginTop: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#c4c4c4c4",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              if (reason.length > 0) {
                const res = await Post<any>(
                  "http://10.0.2.2:4000/api/v1",
                  "/alerts",
                  {
                    reason,
                    description,
                    driver: driver.id,
                    company: driver.company.id,
                  },
                  driver.token,
                );
                if (res.data.ok) {
                  ToastAndroid.show("The alert was sent", ToastAndroid.SHORT);
                  setReset(true);
                  setDescription("");
                } else {
                  ToastAndroid.show(
                    "Something went wrong!",
                    ToastAndroid.SHORT,
                  );
                }
              } else {
                ToastAndroid.show("Please select a reason", ToastAndroid.SHORT);
              }
            }}
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#606060",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: 50,
          marginBottom: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Logs
        </Text>
        <Ionicons name="chevron-forward" color="#000000" size={20} />
      </TouchableOpacity>
    </ScrollView>
  );
};
