import React, { useState } from "react";
import { TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import {
  InputGroup,
  Input as CInput,
  IconP,
  Label,
  Help,
  HelpTxt,
} from "./Elements";
import IonIcons from "react-native-vector-icons/Ionicons";

export interface Props {
  help?: boolean;
  helpHandler?: () => void;
  handler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: any;
  label: string;
  password?: boolean;
}

export const Input: React.FC<Props> = (props) => {
  const [show, setShow] = useState(props.password);
  const [icon, setIcon] = useState({
    name: "eye-off",
    active: true,
  });
  return (
    <InputGroup>
      <Label>{props.label}</Label>
      {props.password && (
        <IconP
          onPress={() => {
            setShow((c) => !c);
            icon.active
              ? setIcon({ name: "eye", active: false })
              : setIcon({ name: "eye-off", active: true });
          }}
        >
          <IonIcons name={icon.name} color="#202020" size={30} />
        </IconP>
      )}
      <CInput
        style={{ borderRadius: 4 }}
        secureTextEntry={show}
        onChange={props.handler}
        value={props.value}
      />
      {props.help && (
        <Help onPress={props.helpHandler}>
          <HelpTxt>Have you forgotten your password?</HelpTxt>
        </Help>
      )}
    </InputGroup>
  );
};
