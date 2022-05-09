import React, { useState, useEffect, useCallback } from "react";
import { CustomInput, CustomSelect, CustomBtn } from "components";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { Container, Btn, Txt, Check } from "components/src/Elements";
import { Map } from "../../../components";

import Geocode from "react-geocode";

import { destinationIcon, originIcon } from "assets";

import { Coord, PolyPath } from "types";
import { RootState } from "../../../redux";
import { useSelector } from "react-redux";
import { Post } from "services";
import { useApiUrl } from "../../../hooks";

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_KEY);

Geocode.setLanguage("en");
Geocode.setRegion("co");

const debounce = (cb: (...args: any) => void, delay = 1000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const formatAddress = (address: string) => {
  return address
    .split(",")
    .filter((u) => !/.*ntico$|.*lombia$/gi.test(u.trim()))
    .join(", ");
};

export const Planner: React.FC = () => {
  const apiUrl = useApiUrl();

  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState<typeof options[0]>();
  const [driver, setDriver] = useState<typeof options[0]>();
  const [clickable, setClickable] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [destination, setDestination] = useState<Coord | null>(null);

  const [settings, setSettings] = useState(false);

  const [googleTL, setGoogleTL] = useState(false);
  const [wazeTL, setWazeTL] = useState(false);
  const [wazeTA, setWazeTA] = useState(false);

  const [paths, setPaths] = useState<PolyPath[]>([]);

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  const latlngFromAddress = useCallback(async (address: string) => {
    try {
      const res = await Geocode.fromAddress(address);
      const { lat, lng } = res.results[0].geometry.location;
      setDestination({ lat, lng });
    } catch (error) {
      // TODO: Notify error
      console.log(error);
    }
  }, []);

  const addressFromLatLng = useCallback(async (lat: number, lng: number) => {
    try {
      setLoadingAddress(true);
      const { results } = await Geocode.fromLatLng(
        lat.toString(),
        lng.toString(),
      );
      const address = formatAddress(results[0].formatted_address as string);
      setAddress(address);
      setLoadingAddress(false);
    } catch (error) {
      setAddress("");
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
            onChange={() => setGoogleTL(!googleTL)}
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
            onChange={() => setWazeTL(!wazeTL)}
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
            onChange={() => setWazeTA(!wazeTA)}
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
        <Btn onClick={() => setSettings((c) => !c)}>
          {settings ? (
            <MdClear size={35} color="black" />
          ) : (
            <MdSettingsSuggest size={35} color="black" />
          )}
        </Btn>
      </Container>
      <Container
        width="20%"
        style={{
          minWidth: "340px",
        }}
        heigh="100%"
        align="center"
        justify="flex-start"
        bg="#f3f3f3c9"
        padding="10px"
        direction="column"
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
            onChange={(e) => setAddress(e)}
            margin="12px 0px"
            placeholder="Destination"
            onClick={(e) => {
              setClickable(e);
            }}
          />
          <CustomSelect
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e)}
            options={company.materials.map((m) => ({
              label: m,
              value: m,
            }))}
            margin="12px 0px"
          />
          <CustomSelect
            placeholder="Driver"
            value={driver}
            onChange={(e) => setDriver(e)}
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
            // lock={
            //   driver === undefined || material === undefined || address === ""
            // }
            lock={address === ""}
            onClick={async () => {
              const res = await Post<{
                distance: number;
                time: number;
                coords: Coord[];
              }>(apiUrl, "/path", {
                points: [
                  {
                    lat: company.lat,
                    lng: company.lng,
                  },
                  {
                    lat: destination?.lat,
                    lng: destination?.lng,
                  },
                ],
              });

              setPaths([{ color: "tomato", path: res.data.coords }]);
            }}
          />
          <CustomBtn
            bg="#eb4242"
            padding="4px"
            margin="15px 0px"
            label="Calculate Origin Side Risk"
          />
          <CustomBtn
            bg="#0094FF"
            padding="4px"
            margin="15px 0px"
            label="Calculate Destination Side Risk"
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
              Distance: -- km
            </Txt>
          </Container>
          <Container
            width="100%"
            align="center"
            justify="flex-start"
            margin="5px 0px"
          >
            <Txt fs="18px" color="black">
              Time: -- min
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
      <Container width="80%" heigh="100%" align="center" justify="center">
        <Map
          polys={paths}
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
            setClickable(false);
          }}
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
        />
      </Container>
    </Container>
  );
};
