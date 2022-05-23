import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Get } from "services";
import { FLog2 } from "types";
import { RootState } from "../../redux";

export const Logs: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [logs, setLogs] = useState<FLog2[]>([]);

  useEffect(() => {
    Get<{ ok: boolean; result: FLog2[] }>(
      "http://10.0.2.2:4000/api/v1",
      "/alerts/driver",
      user.token,
    ).then((res) => {
      if (res.data.ok) {
        setLogs(res.data.result);
      }
    });
  }, [user.token]);

  return (
    <ScrollView
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ width: "100%", marginVertical: 20 }}>
        <Text style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
          Logging
        </Text>
      </View>
      {logs.map((log, i) => (
        <View
          style={{
            width: "100%",
            borderRadius: 4,
            borderWidth: 1,
            padding: 6,
            borderColor: "#c4c4c4c2",
            marginVertical: 10,
          }}
          key={i}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>
            {log.alert.reason}
          </Text>
          <Text style={{ fontSize: 14, color: "black", marginVertical: 4 }}>
            {log.alert.description}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              textAlign: "right",
              marginVertical: 10,
            }}
          >
            Action: {log.action}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
            }}
          >
            Created at: {new Date(log.createdAt).toLocaleString()}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
            }}
          >
            Updated at: {new Date(log.updatedAt).toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};
