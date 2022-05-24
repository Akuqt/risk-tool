import React from "react";
import { Container, Txt } from "components/src/Elements";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux";
import { homeTruck1, truckDark } from "assets";
import { Navbar } from "components";

export const Home: React.FC = () => {
  const navigation = useNavigate();
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  return (
    <Container
      width="100%"
      justify="center"
      align="center"
      heigh="100%"
      bg="#FFFFFF"
      direction="column"
    >
      <Navbar
        logo={truckDark}
        logoHandler={() => {
          if (company.token !== "") {
            navigation("/main/dashboard");
          } else {
            navigation("/");
          }
        }}
        content={
          <Container justify="flex-end" align="center" width="100%">
            {company.token ? (
              <>
                <Container
                  justify="space-between"
                  align="center"
                  width="fit-content"
                  margin="0px 10px"
                >
                  <Txt
                    fs="16px"
                    color="#0D1117"
                    pointer
                    onClick={() => navigation("/main/dashboard")}
                  >
                    Dashboard
                  </Txt>
                </Container>
                <Container
                  justify="space-between"
                  align="center"
                  width="fit-content"
                  margin="0px 10px"
                >
                  <Txt
                    fs="16px"
                    color="#0D1117"
                    pointer
                    onClick={() => navigation("/main/planner")}
                  >
                    Planner
                  </Txt>
                </Container>
                <Container
                  justify="space-between"
                  align="center"
                  width="fit-content"
                  margin="0px 30px 0px 10px"
                >
                  <Txt
                    fs="16px"
                    color="#0D1117"
                    pointer
                    onClick={() => navigation("/main/general")}
                  >
                    General
                  </Txt>
                </Container>
              </>
            ) : (
              <>
                <Container
                  justify="space-between"
                  align="center"
                  width="fit-content"
                  margin="0px 10px"
                >
                  <Txt
                    fs="16px"
                    color="#0D1117"
                    pointer
                    onClick={() => navigation("/login")}
                  >
                    Sign In
                  </Txt>
                </Container>
                <Container
                  justify="space-between"
                  align="center"
                  width="fit-content"
                  margin="0px 30px 0px 10px"
                >
                  <Txt
                    fs="16px"
                    color="#0D1117"
                    pointer
                    onClick={() => navigation("/register")}
                  >
                    Sign Up
                  </Txt>
                </Container>
              </>
            )}
          </Container>
        }
      />
      <Container
        width="100%"
        justify="center"
        align="flex-start"
        heigh="100%"
        bg="#FFFFFF"
        direction="column"
      >
        <Container width="100%" justify="space-between" align="center">
          <Container
            width="50%"
            align="flex-start"
            justify="center"
            direction="column"
          >
            <Txt fs="90px" color="#0D1117" margin="0px 0px 20px 80px">
              Risk Tool
            </Txt>
            <Container
              bg="#FFFFFF"
              justify="center"
              width="100%"
              align="center"
              borderRadius="8px"
              padding="10px"
              margin="0px 0px 20px 80px"
              direction="column"
              style={{
                maxWidth: "400px",
              }}
            >
              <Txt
                fs="20px"
                color="#0D1117"
                margin="0px 0px 20px 0px"
                style={{ textAlign: "left" }}
              >
                System that allows the management of risks associated with the
                transport of hazardous chemical materials in the industrial
                corridors of Barranquilla and its metropolitan area
              </Txt>
            </Container>
          </Container>
          <Container width="50%" justify="center" align="center">
            <img src={homeTruck1} width="100%" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
