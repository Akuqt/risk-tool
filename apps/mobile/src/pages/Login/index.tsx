import React from "react";
import { Container, Logo, LogoContainer, Form } from "./Elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useInputHandler } from "../../hooks";
import { FDriver, IError } from "types";
import { useDispatch } from "react-redux";
import { Input, Btn } from "components/src/native";
import { saveUser } from "../../redux/user";
import { Alert } from "react-native";
import { Post } from "services";
import { logo } from "assets";

type Props = NativeStackScreenProps<{ Home: undefined }, "Home">;

export const Login: React.FC<Props> = ({ navigation }) => {
  const { values, handler } = useInputHandler({ username: "", password: "" });
  const dispatch = useDispatch();
  return (
    <Container>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>

      <Form>
        <Input
          label="User"
          handler={handler("username")}
          value={values.username}
        />
        <Input
          label="Password"
          password
          help
          helpHandler={() => {
            //
          }}
          handler={handler("password")}
          value={values.password}
        />
        <Btn
          fz="18px"
          width="330px"
          bg="#FF6347"
          label="Sign In"
          onPress={async () => {
            console.log(values);

            const res = await Post<{
              ok: boolean;
              result: FDriver;
              error?: IError;
            }>("http://10.0.2.2:4000/api/v1", "/auth/sign-in", {
              ...values,
              type: "driver",
            });
            if (res.data.ok) {
              dispatch(saveUser(res.data.result));
              navigation.navigate("Home");
            } else {
              Alert.alert(res.data.error?.message || "Error");
            }
          }}
        />
      </Form>
    </Container>
  );
};
