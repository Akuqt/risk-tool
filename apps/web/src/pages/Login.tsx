import React from "react";
import { Container, Txt, TextInput, Btn } from "components/src/Elements";
import { useNavigate } from "react-router-dom";
import { Navbar } from "components";

export const Login: React.FC = () => {
  const navigation = useNavigate();
  return (
    <Container
      width="100%"
      justify="center"
      align="center"
      heigh="100%"
      bg="#0D1117"
      direction="column"
    >
      <Navbar
        logo={() => navigation("/")}
        content={
          <Container justify="flex-end" align="center" width="100%">
            <Container
              justify="space-between"
              align="center"
              width="fit-content"
              margin="0px 5px"
            >
              <Txt fs="16px" color="#ffffff">
                New to Risk Tool?
              </Txt>
            </Container>
            <Container
              justify="space-between"
              align="center"
              width="fit-content"
              margin="0px 5px"
            >
              <Txt
                fs="16px"
                color="#ff0000"
                pointer
                onClick={() => navigation("/register")}
              >
                Sign Up
              </Txt>
            </Container>
          </Container>
        }
      />
      <Container
        width="100%"
        justify="center"
        align="center"
        heigh="100%"
        bg="#0D1117"
        direction="column"
      >
        <Txt fs="28px" bold color="#ffffff" margin="0px 0px 20px 0px">
          Sign In
        </Txt>
        <Container
          bg="#C4C4C420"
          justify="center"
          heigh="250px"
          width="350px"
          align="center"
          borderRadius="8px"
          shadow
          padding="10px"
          direction="column"
        >
          <TextInput
            margin="15px 0px"
            type="text"
            color="#ffffff"
            fs="16px"
            width="100%"
            borderBottom
            borderBottomColor="red"
            placerholderColor="#a3a3a3"
            placeholder="Username"
          />
          <TextInput
            margin="20px 0px 5px 0px"
            type="password"
            color="#ffffff"
            fs="16px"
            width="100%"
            borderBottom
            borderBottomColor="red"
            placerholderColor="#a3a3a3"
            placeholder="Password"
          />
          <Container justify="flex-end" align="center" width="100%">
            <Txt color="#ffa000" fs="12px" pointer>
              Have you forgotten your password?
            </Txt>
          </Container>
          <Btn
            bg="#f7160f"
            width="100%"
            height="30px"
            borderRadius="4px"
            margin="40px 0px 0px 0px"
          >
            <Txt color="#ffffff" fs="16px" pointer>
              Login
            </Txt>
          </Btn>
        </Container>
      </Container>
    </Container>
  );
};
