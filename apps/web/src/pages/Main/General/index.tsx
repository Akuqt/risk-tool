import React, { useReducer, useEffect } from "react";
import { destinationIcon, driverIcon, initialState, reducer } from "./helper";
import { Btn, Check, Container, Spinner, Txt } from "components/src/Elements";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { CustomModal, CustomSelect } from "components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, saveCompany } from "../../../redux";
import { useApiUrl, useSocket } from "../../../hooks";
import { originIcon } from "assets";
import { BestRoute } from "types";
import { Map } from "../../../components";
import { Get } from "services";
import {
  getDriver,
  getRoutes,
  getDrivers,
  formatNumber,
  getDestinations,
} from "../../../utils";

export const General: React.FC = () => {
  const apiUrl = useApiUrl();
  const socket = useSocket();
  const dispatch = useDispatch();
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  useEffect(() => {
    socket?.on("update:driver", (d) => {
      const newDrivers = [...company.drivers].map((k) => {
        if (k.id === d.id) {
          return { ...k, ...d };
        }
        return k;
      });
      dispatch(saveCompany({ ...company, drivers: newDrivers }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

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
    {
      routes,
      wazeTA,
      wazeTL,
      settings,
      googleTL,
      mapLoading,
      currentRoute,
      destinations,
    },
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
          margin="10px 0px"
        >
          <Txt fs="18px" color="black" bold>
            Traffic
          </Txt>
        </Container>
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
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="10px 0px"
        >
          <Txt fs="18px" color="black" bold>
            Routes
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="0px 10px 10px 0px"
        >
          <CustomSelect
            placeholder="All Routes"
            value={currentRoute}
            onChange={(e) =>
              dispatcher({ type: "setCurrentRoute", payload: e })
            }
            options={[
              {
                value: "idk",
                label: "All Routes",
              },
              ...routes.map((r) => ({
                label: (() => {
                  const driver_ = getDriver(r.driver, company.drivers);
                  return `${driver_?.name} ${
                    driver_?.lastname
                  } - ${formatNumber(r.risk, 2, "%")} risk`;
                })(),
                value: (() => {
                  const std = JSON.stringify({
                    lat: r.coords[r.coords.length - 1].lat,
                    lng: r.coords[r.coords.length - 1].lng,
                  });
                  const res = `${r.id}*${r.driver}*${r.color}*${std}`;
                  return res;
                })(),
              })),
            ]}
            margin="12px 0px"
          />
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
          polys={getRoutes(currentRoute?.value.split("*")[0] || "", routes).map(
            (r) => ({
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
            }),
          )}
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
            ...getDestinations(
              currentRoute?.value.split("*")[3] || "",
              destinations,
              currentRoute?.value.split("*")[2] || "",
            ),
            ...getDrivers(
              currentRoute?.value.split("*")[1] || "",
              company.drivers,
            ).map((k, i) => ({
              coords: {
                lat: k.lat,
                lng: k.lng,
              },
              svgColor:
                currentRoute?.value.split("*")[2] ||
                destinations[i]?.svgColor ||
                "",
              svgPath: driverIcon,
            })),
          ]}
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
        />
      </Container>
    </Container>
  );
};
