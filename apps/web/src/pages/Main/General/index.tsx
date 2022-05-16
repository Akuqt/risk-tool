import React, { useReducer, useEffect } from "react";
import { destinationIcon, initialState, reducer } from "./helper";
import { Btn, Check, Container, Spinner, Txt } from "components/src/Elements";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { BestRoute, FCompany } from "types";
import { CustomModal } from "components";
import { useSelector } from "react-redux";
import { originIcon } from "assets";
import { useApiUrl } from "../../../hooks";
import { RootState } from "../../../redux";
import { Map } from "../../../components";
import { Get } from "services";

const getDriver = (id: string, drivers: FCompany["drivers"]) => {
  return drivers.find((d) => d.id === id);
};

export const General: React.FC = () => {
  const apiUrl = useApiUrl();
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  useEffect(() => {
    Get<{ ok: boolean; result: BestRoute[] }>(
      apiUrl,
      "/path/all",
      company.token,
    ).then((res) => {
      if (res.data.ok) {
        dispatcher({ type: "setRoutes", payload: res.data.result });
        const destinations = res.data.result.map((r) => ({
          coords: r.coords[r.coords.length - 1],
          svgColor: r.color,
          svgPath: destinationIcon,
          clickable: true,
          info: {
            address: r.address,
          },
        }));
        dispatcher({ type: "setDestinations", payload: destinations });
      }
    });
  }, [company.token, apiUrl]);

  const [
    { wazeTA, wazeTL, settings, googleTL, mapLoading, routes, destinations },
    dispatcher,
  ] = useReducer(reducer, initialState);
  return (
    <Container
      width="100%"
      align="center"
      justify="space-between"
      heigh="calc(100% - 30px)"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Container
        width="300px"
        padding="60px 10px 0px 10px"
        align="center"
        justify="flex-start"
        bg="#f3f3f3c9"
        direction="column"
        heigh="100%"
        style={{
          position: "absolute",
          top: "0px",
          left: settings ? "calc(100% - 300px)" : "100%",
          minWidth: "300px",
          zIndex: 200,
          transition: "left 0.3s",
        }}
      >
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="0px 0px 10px 0px"
        >
          <Check
            bg="transparent"
            activeColor="#0ca82e"
            inactiveColor="#eb4242"
            type="checkbox"
            checked={googleTL}
            onChange={() => dispatcher({ type: "setGoogleTL" })}
          />
          <Txt fs="18px" color="black">
            Google Traffic Layer
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="10px 0px"
        >
          <Check
            bg="transparent"
            activeColor="#0ca82e"
            inactiveColor="#eb4242"
            type="checkbox"
            checked={wazeTL}
            onChange={() => dispatcher({ type: "setWazeTL" })}
          />
          <Txt fs="18px" color="black">
            Waze Traffic Layer
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="10px 0px"
        >
          <Check
            bg="transparent"
            activeColor="#0ca82e"
            inactiveColor="#eb4242"
            type="checkbox"
            checked={wazeTA}
            onChange={() => dispatcher({ type: "setWazeTA" })}
          />
          <Txt fs="18px" color="black">
            Waze Traffic Alerts
          </Txt>
        </Container>
      </Container>
      <Container
        width="fit-content"
        align="center"
        justify="center"
        style={{
          position: "absolute",
          top: "16px",
          left: "calc(100% - 50px)",
          zIndex: 200,
        }}
      >
        <Btn onClick={() => dispatcher({ type: "setSettings" })}>
          {settings ? (
            <MdClear size={35} color="black" />
          ) : (
            <MdSettingsSuggest size={35} color="black" />
          )}
        </Btn>
      </Container>

      <Container width="100%" heigh="100%" align="center" justify="center">
        <CustomModal bg="#2c2c2cac" show={mapLoading}>
          <Spinner radius="100px" borderHeight="8px" color="tomato" />
        </CustomModal>
        <Map
          polys={routes.map((r) => ({
            color: r.color,
            path: r.coords,
            clickable: true,
            info: {
              distance: r.distance,
              material: r.material,
              risk: r.risk,
              time: r.time,
              route: r.id,
              driver: (() => {
                const d = getDriver(r.driver, company.drivers);
                return d?.name + " " + d?.lastname;
              })(),
            },
          }))}
          markers={[
            {
              coords: { lat: company.lat, lng: company.lng },
              icon: originIcon,
              info: {
                address: company.address,
                name: company.name,
              },
              clickable: true,
            },
            ...destinations,
          ]}
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
        />
      </Container>
    </Container>
  );
};
