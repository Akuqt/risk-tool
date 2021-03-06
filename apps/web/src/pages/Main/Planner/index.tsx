import React, { useEffect, useCallback, useReducer, useRef } from "react";
import Geocode from "react-geocode";
import config from "../../../config";
import toast from "react-hot-toast";
import { RootState, updateDriverAndLogs, updateLogState } from "../../../redux";
import { Container, Btn, Txt, Check, Spinner } from "components/src/Elements";
import { BestPath, Coord, FLog2, IError } from "types";
import { destinationIcon, originIcon } from "assets";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { initialState, reducer } from "./helper";
import { useLocation, Location } from "react-router-dom";
import { driverIcon } from "../General/helper";
import { useApiUrl } from "../../../hooks";
import { Post, Put } from "services";
import { Risk } from "./Risk";
import { Map } from "../../../components";
import {
  CustomBtn,
  RadioGroup,
  CustomModal,
  CustomInput,
  CustomSelect,
} from "components";
import {
  debounce,
  riskColor,
  getDriver,
  riskPathMap,
  formatNumber,
  formatAddress,
} from "../../../utils";

Geocode.setApiKey(config.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("co");

export const Planner: React.FC = () => {
  const mounted = useRef(false);
  const apiUrl = useApiUrl();

  const [
    {
      risk,
      wazeTA,
      wazeTL,
      driver,
      address,
      settings,
      newIndex,
      material,
      googleTL,
      clickable,
      showModal,
      fixedPath,
      riskPaths,
      logMarker,
      mapLoading,
      destination,
      currentIndex,
      pathSelector,
      loadingAddress,
      fixedPathIndex,
      riskCalculation,
    },
    dispatcher,
  ] = useReducer(reducer, initialState);

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const dispatch = useDispatch();

  const { state: logState } = useLocation() as Location & {
    state?: { log: FLog2 };
  };

  const latlngFromAddress = useCallback(async (address: string) => {
    try {
      if (mounted.current) {
        dispatcher({ type: "setMapLoading", payload: true });
      }
      const res = await Geocode.fromAddress(address);
      if (mounted.current) {
        const { lat, lng } = res.results[0].geometry.location;
        dispatcher({ type: "setDestination", payload: { lat, lng } });
        dispatcher({ type: "setMapLoading", payload: false });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        id: "planner-error-data-add1",
      });
      dispatcher({ type: "setMapLoading", payload: false });
    }
  }, []);

  const addressFromLatLng = useCallback(async (lat: number, lng: number) => {
    try {
      if (mounted.current) {
        dispatcher({ type: "setLoadingAddress", payload: true });
      }
      const { results } = await Geocode.fromLatLng(
        lat.toString(),
        lng.toString(),
      );
      if (mounted.current) {
        const address = formatAddress(results[0].formatted_address as string);
        dispatcher({ type: "setAddress", payload: address });
        dispatcher({ type: "setLoadingAddress", payload: false });
      }
    } catch (error) {
      if (mounted.current) {
        dispatcher({ type: "setAddress", payload: "" });
      }
      toast.error("Something went wrong!", {
        id: "planner-error-data-add2",
        position: "bottom-right",
      });
    }
  }, []);

  useEffect(() => {
    if (address) debounce(() => latlngFromAddress(address))();
  }, [address, latlngFromAddress]);

  useEffect(() => {
    mounted.current = true;
    if (logState?.log) {
      dispatcher({
        type: "setAddress",
        payload: logState.log.destination.address,
      });
      dispatcher({
        type: "setMaterial",
        payload: { label: logState.log.material, value: logState.log.material },
      });
      dispatcher({
        type: "setDriver",
        payload: {
          label: (() => {
            const driver = getDriver(logState.log.driver, company.drivers);
            return driver?.name + " " + driver?.lastname;
          })(),
          value: logState.log.driver,
        },
      });
      dispatcher({
        type: "setLogMarker",
        payload: {
          coords: { lat: logState.log.lat, lng: logState.log.lng },
          svgPath: driverIcon,
          svgColor: "tomato",
        },
      });
    }

    return () => {
      mounted.current = false;
    };
  }, [logState?.log, company.drivers]);

  return (
    <Container
      width="100%"
      align="center"
      justify="space-between"
      heigh="calc(100% - 30px)"
      style={{ position: "relative", overflowX: "hidden", overflowY: "auto" }}
    >
      <CustomModal
        show={showModal && riskCalculation}
        bg="transparent"
        height="fit-content"
        up
      >
        <Risk
          url={apiUrl}
          close={(risk_) => {
            if (risk_) {
              if (mounted.current) {
                const t = fixedPath[fixedPathIndex].coords.slice(
                  currentIndex > 0 ? currentIndex - 1 : 0,
                  newIndex,
                );
                dispatcher({
                  type: "setRiskPaths",
                  payload: {
                    path: t,
                    color: riskColor(risk_),
                    risk: risk_,
                  },
                });
                dispatcher({ type: "setCurrentIndex", payload: newIndex });
                dispatcher({ type: "setShowModal", payload: false });
              }
            } else {
              toast.error("Something went wrong!", {
                id: "planner-error-data-risk",
                position: "bottom-right",
              });
            }
          }}
        />
      </CustomModal>
      <Container
        width="fit-content"
        align="center"
        justify="flex-start"
        style={{
          position: "absolute",
          top: pathSelector && !riskCalculation ? "2%" : "-10%",
          left: "25%",
          zIndex: 300,
          transition: "top 0.3s",
        }}
      >
        <RadioGroup
          reset={fixedPathIndex === 0}
          group="Alternatives"
          length={fixedPath.length || 1}
          onChange={(i) => {
            dispatcher({ type: "setFixedPathIndex", payload: i });
          }}
        />
      </Container>
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
      <Container
        width="20%"
        heigh="100%"
        align="center"
        justify="flex-start"
        bg="#f3f3f3"
        padding="10px"
        direction="column"
        style={{ zIndex: 310, overflowY: "auto" }}
      >
        <Container
          width="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <CustomInput
            disabled={!!logState?.log}
            loading={loadingAddress}
            value={address}
            onChange={(e) => dispatcher({ type: "setAddress", payload: e })}
            margin="12px 0px"
            placeholder="Destination"
            onClick={(e) => {
              dispatcher({ type: "setClickable", payload: e });
            }}
          />
          <CustomSelect
            disabled={!!logState?.log}
            placeholder="Material"
            value={material}
            onChange={(e) => dispatcher({ type: "setMaterial", payload: e })}
            options={company.materials.map((m) => ({
              label: m,
              value: m,
            }))}
            margin="12px 0px"
          />
          <CustomSelect
            disabled={!!logState?.log}
            placeholder="Driver"
            value={driver}
            onChange={(e) => dispatcher({ type: "setDriver", payload: e })}
            options={company.drivers
              .filter((d) => !d.active)
              .map((d) => ({
                label: d.name + " " + d.lastname,
                value: d.id,
              }))}
            margin="12px 0px"
          />
        </Container>
        <Container
          width="100%"
          align="center"
          justify="center"
          direction="column"
          margin="20px 0px 0px 0px"
        >
          <CustomBtn
            bg="#c4c4c4"
            padding="4px"
            margin="15px 0px"
            label="Calculate Paths"
            lock={
              driver === undefined || material === undefined || address === ""
            }
            onClick={async () => {
              dispatcher({ type: "reset" });
              if (destination?.lat && destination.lng) {
                dispatcher({ type: "setMapLoading", payload: true });
                const origin_ = logState?.log
                  ? { lat: logState.log.lat, lng: logState.log.lng }
                  : { lat: company.lat, lng: company.lng };
                const res = await Post<
                  { ok: boolean; error: IError } & BestPath
                >(apiUrl, "/path/best", {
                  origin: origin_,
                  destination,
                });
                if (res.data.ok) {
                  if (mounted.current) {
                    dispatcher({
                      type: "setFixedPath",
                      payload: res.data.result,
                    });
                    dispatcher({ type: "setPathSelector", payload: true });
                    dispatcher({ type: "setMapLoading", payload: false });
                  }
                } else {
                  toast.error(res.data.error?.message || "", {
                    id: "planner-error-data-set-route",
                    position: "bottom-right",
                  });
                }
              }
            }}
          />
          <CustomBtn
            bg="#eb4242"
            padding="4px"
            margin="15px 0px"
            label={(() => {
              if (riskPaths.length === 0) return "Set Risk Points";
              if (risk > 0) return "Reset Risk Points";
              return "Calculate Risk";
            })()}
            lock={fixedPath.length === 0}
            onClick={() => {
              if (risk > 0) {
                dispatcher({ type: "resetRisk" });
                return;
              }
              if (riskPaths.length > 0) {
                const risk_ = riskPaths.reduce(
                  (acc, curr) => acc + curr.risk,
                  0,
                );
                dispatcher({
                  type: "setRisk",
                  payload: risk_ / riskPaths.length,
                });
                return;
              }
              dispatcher({ type: "setRiskCalculation", payload: true });
            }}
          />
        </Container>
        <Container
          width="100%"
          align="center"
          justify="center"
          direction="column"
          margin="20px 0px 0px 0px"
        >
          <Container
            width="100%"
            align="center"
            justify="flex-start"
            margin="10px 0px 5px 0px"
          >
            <Txt fs="18px" color="black">
              Distance:{" "}
              {formatNumber(
                (fixedPath[fixedPathIndex]?.distance || 0) / 1000,
                2,
                "km",
              )}
            </Txt>
          </Container>
          <Container
            width="100%"
            align="center"
            justify="flex-start"
            margin="5px 0px"
          >
            <Txt fs="18px" color="black">
              Time:{" "}
              {formatNumber(
                (fixedPath[fixedPathIndex]?.time || 0) / 60,
                2,
                "min",
              )}
            </Txt>
          </Container>
          <Container
            width="100%"
            align="center"
            justify="flex-start"
            margin="5px 0px"
          >
            <Txt fs="18px" color="black">
              Risk: {formatNumber(risk, 2, "%") || "-- %"}
            </Txt>
          </Container>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="40px 0px"
        >
          <CustomBtn
            bg="#0094FF"
            padding="4px"
            margin="10px 0px"
            label="Set Route"
            lock={fixedPath.length === 0 || risk === 0}
            onClick={async () => {
              const res = await Post<{
                ok: boolean;
                path: Coord[];
                error?: IError;
              }>(
                apiUrl,
                "/path/new",
                {
                  risk,
                  address,
                  driver: driver?.value,
                  material: material?.value,
                  time: fixedPath[fixedPathIndex].time,
                  fixed: fixedPath[fixedPathIndex].coords,
                  distance: fixedPath[fixedPathIndex].distance,
                  dlat: destination?.lat,
                  dlng: destination?.lng,
                },
                company.token,
              );

              if (res.data.ok) {
                if (mounted.current) {
                  dispatch(updateDriverAndLogs({ risk, id: driver?.value }));
                  if (logState?.log) {
                    const res_ = await Put<{ ok: boolean; error?: IError }>(
                      apiUrl,
                      "/alerts/edit",
                      { action: "Recalculate", log: logState.log.id },
                      company.token,
                    );
                    if (res_.data.ok) {
                      dispatch(
                        updateLogState({
                          id: logState.log.id,
                          action: "Recalculate",
                        }),
                      );
                    } else {
                      toast.error(res_.data.error?.message || "", {
                        id: "planner-error-data-set-log-rec",
                        position: "bottom-right",
                      });
                    }
                  }

                  toast.success("Route set successfully", {
                    id: "bottom-left-planner-set-route",
                  });
                }
              } else {
                toast.error(res.data.error?.message || "", {
                  id: "planner-error-data-new-route-idk",
                  position: "bottom-right",
                });
              }
            }}
          />
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="5px 0px"
        >
          <Txt fs="18px" color="black" bold>
            {company.name}
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="5px 0px"
        >
          <Txt fs="16px" color="black">
            {formatAddress(company.address)}
          </Txt>
        </Container>
      </Container>
      <Container
        width="80%"
        heigh="100%"
        align="center"
        justify="center"
        style={{ position: "absolute", left: "20%" }}
      >
        <CustomModal bg="#2c2c2cac" show={mapLoading}>
          <Spinner radius="100px" borderHeight="8px" color="tomato" />
        </CustomModal>
        <Map
          polys={[
            {
              color: "#8c00ff",
              path: fixedPath[fixedPathIndex]?.coords || [],
              clickable: riskCalculation && risk === 0,
              onClick: (i) => {
                if (i > currentIndex) {
                  dispatcher({ type: "setNewIndex", payload: i });
                  dispatcher({ type: "setShowModal" });
                }
              },
            },
            ...riskPaths.map(riskPathMap),
          ]}
          markers={[
            {
              coords: destination,
              icon: destinationIcon,
              info: {
                address,
              },
              clickable: true,
            },
            {
              coords: { lat: company.lat, lng: company.lng },
              icon: originIcon,
              clickable: true,
              info: {
                name: company.name,
                address: company.address,
              },
            },
            {
              coords: logMarker?.coords || null,
              svgPath: logMarker?.svgPath,
              svgColor: logMarker?.svgColor,
            },
          ]}
          canClick={clickable}
          onClick={async ({ lat, lng }) => {
            await addressFromLatLng(lat, lng);
            dispatcher({ type: "setClickable", payload: false });
          }}
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
          showCompanies
          onCompanyClick={(add) => {
            dispatcher({ type: "setAddress", payload: add });
          }}
        />
      </Container>
    </Container>
  );
};
