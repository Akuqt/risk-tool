import React from "react";
import { Container, Logo, LogoContainer, Form } from "./Elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useInputHandler } from "../../hooks";
import { useDispatch } from "react-redux";
import { Input, Btn } from "components/src/native";
import { saveUser } from "../../redux/user";
import { Post } from "services";
import { Alert } from "react-native";
import { logo } from "assets";
import { User } from "types";

type Props = NativeStackScreenProps<{ Home: undefined }, "Home">;

export const Login: React.FC<Props> = ({ navigation }) => {
  const { values, handler } = useInputHandler({ user: "", password: "" });
  const dispatch = useDispatch();
  return (
    <Container>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>

      <Form>
        <Input label="User" handler={handler("user")} value={values.user} />
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
            const res = await Post<{ ok: boolean; user: User }>(
              "/auth/sign-in",
              values,
            );
            if (res.data.ok) {
              dispatch(saveUser(res.data.user));
              navigation.navigate("Home");
            } else {
              Alert.alert("Error");
            }
          }}
        />
      </Form>
    </Container>
  );
};
