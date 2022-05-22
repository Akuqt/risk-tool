import React, { useCallback, useState, useEffect, useRef } from "react";
import config from "../../../config";
import Geocode from "react-geocode";
import { Btn, Container, Spinner, Txt, TxtBtn } from "components/src/Elements";
import { formatAddress } from "../../../utils";
import { FLog2 } from "types";
import { MdClose } from "react-icons/md";

Geocode.setApiKey(config.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("co");

interface Props {
  width: string;
  alert: FLog2 | null;
  actions: {
    view: (address: string) => void;
    close: () => void;
    dismiss: () => void;
    recalculate: () => void;
  };
}

export const Alert: React.FC<Props> = ({
  width,
  alert,
  actions: { dismiss, recalculate, view, close },
}) => {
  const mounted = useRef(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const addressFromLatLng = useCallback(async (lat: number, lng: number) => {
    try {
      const { results } = await Geocode.fromLatLng(
        lat.toString(),
        lng.toString(),
      );
      if (mounted.current) {
        const address = formatAddress(results[0].formatted_address as string);
        setAddress(address);
        setLoading(false);
      }
    } catch (error) {
      if (mounted.current) {
        setLoading(false);
        setAddress("");
      }
    }
  }, []);

  useEffect(() => {
    addressFromLatLng(alert?.lat || 0, alert?.lng || 0);
  }, [addressFromLatLng, alert]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Container
      width={width}
      justify="center"
      align="flex-start"
      direction="column"
      padding="10px 20px"
      bg="#ffffff"
      shadow
      borderRadius="5px"
      style={{
        minWidth: 300,
      }}
    >
      <Container align="center" justify="flex-end" width="100%">
        <Btn
          onClick={() => {
            close();
          }}
        >
          <MdClose color="#000000" size={30} />
        </Btn>
      </Container>
      <Txt fs="18px" color="#000000" bold margin="4px">
        {alert?.alert.reason}
      </Txt>
      {loading ? (
        <Spinner color="#000000" borderHeight="2px" radius="20px" />
      ) : (
        <Txt color="#000000" fs="16" margin="4px">
          Near {address}
        </Txt>
      )}
      <Txt fs="18px" color="#000000" margin="4px">
        Description: {alert?.alert.description}
      </Txt>
      <Container
        width="100%"
        align="center"
        justify="flex-end"
        margin="10px 0px"
      >
        <TxtBtn color="#0094FF" margin="0px 5px" onClick={() => dismiss()}>
          Dissmis
        </TxtBtn>
        <TxtBtn color="#0094FF" onClick={() => view(address)} margin="0px 5px">
          View
        </TxtBtn>
        <TxtBtn
          color="#0094FF"
          onClick={() => recalculate()}
          margin="0px 0px 0px 5px"
        >
          Recalculate
        </TxtBtn>
      </Container>
    </Container>
  );
};
