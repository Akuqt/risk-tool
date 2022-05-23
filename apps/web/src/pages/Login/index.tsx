import React, { useReducer, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Container, Txt, TextInput, Btn } from "components/src/Elements";
import { initialState, reducer } from "./helper";
import { FCompany, IError } from "types";
import { useNavigate } from "react-router-dom";
import { saveCompany } from "../../redux";
import { useDispatch } from "react-redux";
import { useApiUrl } from "../../hooks";
import { Navbar } from "components";
import { truck } from "assets";
import { Post } from "services";

export const Login: React.FC = () => {
  const mounted = useRef(false);
  const navigation = useNavigate();
  const apiUrl = useApiUrl();
  const [{ password, username }, dispatcher] = useReducer(
    reducer,
    initialState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
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
        logo={truck}
        logoHandler={() => navigation("/")}
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
                color="#FF6347"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextInput
              margin="15px 0px"
              type="text"
              color="#ffffff"
              fs="16px"
              width="100%"
              borderBottom
              borderBottomColor="#FF6347"
              placerholderColor="#a3a3a3"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                dispatcher({ type: "setUsername", payload: e.target.value })
              }
            />
            <TextInput
              margin="20px 0px 5px 0px"
              type="password"
              color="#ffffff"
              fs="16px"
              width="100%"
              borderBottom
              borderBottomColor="#FF6347"
              placerholderColor="#a3a3a3"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                dispatcher({ type: "setPassword", payload: e.target.value })
              }
            />
            <Container justify="flex-end" align="center" width="100%">
              <Txt color="#ffa000" fs="12px" pointer>
                Have you forgotten your password?
              </Txt>
            </Container>
            <Btn
              type="submit"
              bg="#FF6347"
              width="100%"
              height="30px"
              borderRadius="4px"
              margin="40px 0px 0px 0px"
              onClick={async () => {
                const res = await Post<{
                  ok: boolean;
                  result: FCompany;
                  error?: IError;
                }>(apiUrl, "/auth/sign-in", {
                  type: "company",
                  password,
                  username,
                });
                if (res.data.ok) {
                  if (mounted.current) {
                    dispatch(saveCompany(res.data.result));
                    dispatcher({ type: "clearAll" });
                    navigation("/main/dashboard");
                  }
                } else {
                  toast.error(res.data.error?.message || "", {
                    id: "error-api-login",
                    position: "bottom-right",
                  });
                }
              }}
            >
              <Txt color="#ffffff" fs="16px" pointer>
                Login
              </Txt>
            </Btn>
          </form>
        </Container>
      </Container>
    </Container>
  );
};
