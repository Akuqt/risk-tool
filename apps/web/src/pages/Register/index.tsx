import React, { useReducer, useEffect, useCallback, useRef } from "react";
import Geocode from "react-geocode";
import config from "../../config";
import toast from "react-hot-toast";
import { Btn, Container, TextInput, Txt } from "components/src/Elements";
import { initialState, reducer } from "./helper";
import { FCompany, IError } from "types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCompany } from "../../redux";
import { useApiUrl } from "../../hooks";
import { debounce } from "../../utils";
import { Navbar } from "components";
import { truck } from "assets";
import { Post } from "services";

Geocode.setApiKey(config.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("co");

export const Register: React.FC = () => {
  const mounted = useRef(false);
  const navigation = useNavigate();
  const apiUrl = useApiUrl();
  const [{ address, name, password, username, error, coords }, dispatcher] =
    useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const latlngFromAddress = useCallback(async (address: string) => {
    try {
      const res = await Geocode.fromAddress(address);
      if (mounted.current) {
        const { lat, lng } = res.results[0].geometry.location;
        dispatcher({ type: "setError", payload: false });
        dispatcher({ type: "setCoords", payload: { lat, lng } });
      }
    } catch (err) {
      if (mounted.current) {
        dispatcher({ type: "setError", payload: true });
      }
    }
  }, []);

  useEffect(() => {
    if (address) debounce(() => latlngFromAddress(address))();
  }, [address, latlngFromAddress]);

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
                Already have an account?
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
                onClick={() => navigation("/login")}
              >
                Sign In
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
          Sign Up
        </Txt>
        <Container
          bg="#C4C4C420"
          justify="center"
          heigh="350px"
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
              placeholder="Name"
              value={name}
              onChange={(e) =>
                dispatcher({ type: "setName", payload: e.target.value })
              }
            />
            <TextInput
              margin="15px 0px"
              type="text"
              color="#ffffff"
              fs="16px"
              width="100%"
              borderBottom
              borderBottomColor="#FF6347"
              placerholderColor="#a3a3a3"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                dispatcher({ type: "setAddress", payload: e.target.value })
              }
            />
            <TextInput
              required
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
              required
              margin="15px 0px"
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
            <Btn
              type="submit"
              bg="#FF6347"
              width="100%"
              height="30px"
              borderRadius="4px"
              margin="30px 0px 0px 0px"
              onClick={async () => {
                if (!error) {
                  const res = await Post<{
                    ok: boolean;
                    result: FCompany;
                    error?: IError;
                  }>(apiUrl, "/auth/sign-up", {
                    type: "company",
                    name,
                    password,
                    username,
                    address,
                    lat: coords.lat,
                    lng: coords.lng,
                    materials: [],
                  });
                  if (res.data.ok) {
                    if (mounted.current) {
                      dispatch(saveCompany(res.data.result));
                      dispatcher({ type: "clearAll" });
                      navigation("/main/dashboard");
                    }
                  } else {
                    toast.error(
                      res.data.error?.message || "Something went wrong!",
                      { id: "error-api-reg", position: "bottom-right" },
                    );
                  }
                } else {
                  toast.error("Invalid Address!", {
                    id: "error-loc-reg",
                    position: "bottom-right",
                  });
                }
              }}
            >
              <Txt color="#ffffff" fs="16px" pointer>
                Register
              </Txt>
            </Btn>
          </form>
        </Container>
      </Container>
    </Container>
  );
};
