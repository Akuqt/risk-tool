import React, { useState } from "react";
import { CustomInput, CustomSelect, CustomBtn } from "components";
import { MdClear, MdSettingsSuggest } from "react-icons/md";
import { Container, Btn, Txt, Check } from "components/src/Elements";
import { Map } from "../../../components";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Planner: React.FC = () => {
  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState<typeof options[0]>();
  const [driver, setDriver] = useState<typeof options[0]>();

  const [settings, setSettings] = useState(false);

  const [googleTL, setGoogleTL] = useState(false);
  const [wazeTL, setWazeTL] = useState(false);
  const [wazeTA, setWazeTA] = useState(false);

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
            value={address}
            onChange={(e) => setAddress(e)}
            margin="12px 0px"
            placeholder="Destination"
            onClick={(e) => {
              console.log("click", e);
            }}
          />
          <CustomSelect
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e)}
            options={options}
            margin="12px 0px"
          />
          <CustomSelect
            placeholder="Driver"
            value={driver}
            onChange={(e) => setDriver(e)}
            options={options}
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
          <Btn
            bg="#c4c4c4"
            width="100%"
            borderRadius="4px"
            padding="4px"
            margin="15px 0px"
          >
            <Txt color="black" fs="18px" pointer>
              Calculate Paths
            </Txt>
          </Btn>
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
          <Btn width="100%" bg="#0ca82e" borderRadius="4px" padding="4px">
            <Txt fs="18px" color="black" pointer>
              Set Route
            </Txt>
          </Btn>
        </Container>
      </Container>
      <Container width="80%" heigh="100%" align="center" justify="center">
        <Map
          showWazeAlertsLayer={wazeTA}
          showWazeTrafficLayer={wazeTL}
          showGoogleTrafficLayer={googleTL}
        />
      </Container>
    </Container>
  );
};
