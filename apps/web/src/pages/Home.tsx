import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompany, RootState } from "../redux";
import { Container, Txt } from "components/src/Elements";
import { useNavigate } from "react-router-dom";
import { truckDark } from "assets";
import { Navbar } from "components";

export const Home: React.FC = () => {
  const navigation = useNavigate();
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const dispatch = useDispatch();
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
        logoHandler={() => navigation("/")}
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
        <Txt fs="90px" color="#0D1117" margin="0px 0px 20px 100px">
          Risk Tool
        </Txt>
        <Container
          bg="#FFFFFF"
          justify="center"
          heigh="170px"
          width="450px"
          align="center"
          borderRadius="8px"
          padding="10px"
          margin="0px 0px 20px 80px"
          direction="column"
        >
          <Txt fs="20px" color="#0D1117" margin="0px 0px 20px 0px">
            System that allows the management of risks associated with the
            transport of hazardous chemical materials in the industrial
            corridors of Barranquilla and its metropolitan area
          </Txt>
        </Container>
        <Container
          bg="#FFFFFF"
          justify="center"
          heigh="170px"
          width="450px"
          align="center"
          borderRadius="8px"
          padding="10px"
          margin="0px 0px 20px 80px"
          direction="column"
        >
          <button
            onClick={() => {
              dispatch(clearCompany());
            }}
          >
            Log out
          </button>
        </Container>
      </Container>
    </Container>
  );
};
