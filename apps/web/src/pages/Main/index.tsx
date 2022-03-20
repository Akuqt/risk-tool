import React from "react";
import { Container, Txt } from "components/src/Elements";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Dashboard } from "./Dashboard";
import { truckDark } from "assets";
import { NotFound } from "../NotFound";
import { General } from "./General";
import { Planner } from "./Planner";
import { Navbar } from "components";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const Main: React.FC = () => {
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const navigation = useNavigate();
  const { pathname } = useLocation();

  return company.token ? (
    <>
      <Navbar
        logo={truckDark}
        logoHandler={() => navigation("/")}
        content={
          <Container justify="flex-end" align="center" width="100%">
            <Container
              justify="space-between"
              align="center"
              width="fit-content"
              margin="0px 10px"
              borderBottom={pathname === "/main/dashboard"}
              borderBottomColor="#0D1117"
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
              borderBottom={pathname === "/main/planner"}
              borderBottomColor="#0D1117"
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
              borderBottom={pathname === "/main/general"}
              borderBottomColor="#0D1117"
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
          </Container>
        }
      />
      <Routes>
        <Route path="/" element={<Navigate to="/main/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/general" element={<General />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
