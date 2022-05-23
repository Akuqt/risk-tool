import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  items: string[];
  reset: boolean;
  onSelect: (item: string) => void;
}

export const Select: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (props.reset) {
      setSelected(-1);
    }
  }, [props.reset]);

  return (
    <View style={{ borderBottomWidth: 1, paddingTop: 5, paddingBottom: 10 }}>
      <TouchableOpacity
        onPress={() => setShow((c) => !c)}
        style={{ width: "100%" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#000000", fontSize: 16 }}>
            {selected > -1 ? props.items[selected] : "Select One"}
          </Text>
          {show ? (
            <Ionicons name="chevron-up" color="#000000" size={20} />
          ) : (
            <Ionicons name="chevron-down" color="#000000" size={20} />
          )}
        </View>
      </TouchableOpacity>
      {show && (
        <View>
          {props.items.map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(i);
                props.onSelect(item);
                setShow(false);
              }}
              key={i}
            >
              <Text style={{ fontSize: 14, marginVertical: 2 }}>
                {"- " + item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
