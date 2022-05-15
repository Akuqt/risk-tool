import React, { useEffect, useCallback, useReducer } from "react";
import Geocode from "react-geocode";
import { debounce, formatAddress, formatNumber } from "../../../utils";
import { destinationIcon, originIcon } from "assets";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { Container, Btn, Txt, Check, Spinner } from "components/src/Elements";
import { initialState, reducer } from "./helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useApiUrl } from "../../../hooks";
import { BestPath } from "types";
import { Post } from "services";
import { Map } from "../../../components";
import {
  CustomBtn,
  RadioGroup,
  CustomModal,
  CustomInput,
  CustomSelect,
} from "components";

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("co");

export const Planner: React.FC = () => {
  const apiUrl = useApiUrl();

  const [
    {
      wazeTA,
      wazeTL,
      driver,
      address,
      settings,
      material,
      googleTL,
      clickable,
      fixedPath,
      originPath,
      mapLoading,
      destination,
      originIndex,
      pathSelector,
      loadingAddress,
      fixedPathIndex,
      showOriginModal,
      destinationPath,
      destinationIndex,
      showDestinationModal,
    },
    dispatcher,
  ] = useReducer(reducer, initialState);

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  const latlngFromAddress = useCallback(async (address: string) => {
    try {
      dispatcher({ type: "setMapLoading", payload: true });
      const res = await Geocode.fromAddress(address);
      const { lat, lng } = res.results[0].geometry.location;
      dispatcher({ type: "setDestination", payload: { lat, lng } });
      dispatcher({ type: "setMapLoading", payload: false });
    } catch (error) {
      // TODO: Notify error
    }
  }, []);

  const addressFromLatLng = useCallback(async (lat: number, lng: number) => {
    try {
      dispatcher({ type: "setLoadingAddress", payload: true });
      const { results } = await Geocode.fromLatLng(
        lat.toString(),
        lng.toString(),
      );
      const address = formatAddress(results[0].formatted_address as string);
      dispatcher({ type: "setAddress", payload: address });
      dispatcher({ type: "setLoadingAddress", payload: false });
    } catch (error) {
      dispatcher({ type: "setAddress", payload: "" });
    }
  }, []);

  useEffect(() => {
    if (address) debounce(() => latlngFromAddress(address))();
  }, [address, latlngFromAddress]);

  return (
    <Container
      width="100%"
      align="center"
      justify="space-between"
      heigh="calc(100% - 30px)"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <CustomModal
        show={showOriginModal || showDestinationModal}
        bg="#2c2c2cac"
      >
        <button
          onClick={() => {
            if (showOriginModal) {
              dispatcher({ type: "setShowOriginModal" });
            } else {
              dispatcher({ type: "setShowDestinationModal" });
            }
          }}
        >
          X
        </button>
      </CustomModal>
      <Container
        width="300px"
        align="center"
        justify="flex-start"
        style={{
          position: "absolute",
          top: pathSelector ? "2%" : "-5%",
          left: "25%",
          zIndex: 300,
          transition: "top 0.3s",
        }}
      >
        <RadioGroup
          group="Origin"
          length={originPath.length || 1}
          onChange={(i) => {
            dispatcher({ type: "setOriginIndex", payload: i });
          }}
        />
        <RadioGroup
          group="Fixed"
          length={fixedPath.length || 1}
          onChange={(i) => {
            dispatcher({ type: "setFixedPathIndex", payload: i });
          }}
        />
        <RadioGroup
          group="Destination"
          length={destinationPath.length || 1}
          onChange={(i) => {
            dispatcher({ type: "setDestinationIndex", payload: i });
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
        style={{ zIndex: 310 }}
      >
        <Container
          width="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <CustomInput
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
            placeholder="Driver"
            value={driver}
            onChange={(e) => dispatcher({ type: "setDriver", payload: e })}
            options={company.drivers.map((d) => ({
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
              if (destination?.lat && destination.lng) {
                dispatcher({ type: "reset" });
                dispatcher({ type: "setMapLoading", payload: true });
                const res = await Post<{ ok: boolean } & BestPath>(
                  apiUrl,
                  "/path/best",
                  {
                    origin: {
                      lat: company.lat,
                      lng: company.lng,
                    },
                    destination,
                  },
                );
                dispatcher({
                  type: "setOriginPath",
                  payload: res.data.result.originPath,
                });
                dispatcher({
                  type: "setDestinationPath",
                  payload: res.data.result.destinationPath,
                });
                dispatcher({
                  type: "setFixedPath",
                  payload: res.data.result.fixedPath,
                });
                dispatcher({ type: "setPathSelector", payload: true });
                dispatcher({ type: "setMapLoading", payload: false });
              }
            }}
          />
          <CustomBtn
            bg="#eb4242"
            padding="4px"
            margin="15px 0px"
            label="Calculate Origin Risk"
            onClick={() => {
              dispatcher({ type: "setShowOriginModal" });
            }}
          />
          <CustomBtn
            bg="#0094FF"
            padding="4px"
            margin="15px 0px"
            label="Calculate Destination Risk"
            onClick={() => {
              dispatcher({ type: "setShowDestinationModal" });
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
                ((fixedPath[fixedPathIndex]?.distance || 0) +
                  (originPath[originIndex]?.distance || 0) +
                  (destinationPath[destinationIndex]?.distance || 0)) /
                  1000,
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
                ((fixedPath[fixedPathIndex]?.time || 0) +
                  (originPath[originIndex]?.time || 0) +
                  (destinationPath[destinationIndex]?.time || 0)) /
                  60,
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
              Risk: -- %
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
            bg="#0ca82e"
            padding="4px"
            margin="10px 0px"
            label="Set Route"
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
            { color: "tomato", path: fixedPath[fixedPathIndex]?.coords || [] },
            { color: "red", path: originPath[originIndex]?.coords || [] },
            {
              color: "blue",
              path: destinationPath[destinationIndex]?.coords || [],
            },
          ]}
          markers={[
            { coords: destination, icon: destinationIcon },
            {
              coords: { lat: company.lat, lng: company.lng },
              icon: originIcon,
            },
          ]}
          canClick={clickable}
          onClick={({ lat, lng }) => {
            addressFromLatLng(lat, lng);
            dispatcher({ type: "setClickable", payload: false });
          }}
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
        />
      </Container>
    </Container>
  );
};
