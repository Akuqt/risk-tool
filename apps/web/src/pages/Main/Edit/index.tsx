import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { MultiValue } from "react-select";
import Geocode from "react-geocode";
import config from "../../../config";
import { Container, Txt, TextInput, Btn } from "components/src/Elements";
import { useDispatch, useSelector } from "react-redux";
import { Coord, FCompany, IError } from "types";
import { RootState, saveCompany } from "../../../redux";
import { useNavigate } from "react-router-dom";
import { useApiUrl } from "../../../hooks";
import { debounce } from "../../../utils";
import { Put } from "services";

const options = [
  { value: "Hexano", label: "Hexano" },
  { value: "Acetona", label: "Acetona" },
  { value: "Metanol", label: "Metanol" },
  { value: "Tolueno", label: "Tolueno" },
  { value: "Carbon disulfide", label: "Carbon disulfide" },
  { value: "Acetato de etilo", label: "Acetato de etilo" },
];

interface ISelect {
  label: string;
  value: string;
}

Geocode.setApiKey(config.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("co");

export const Edit: React.FC = () => {
  const mounted = useRef(false);

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  const [values, setValues] = useState<ISelect[]>(
    company.materials.map((m) => ({ label: m, value: m })),
  );

  const [error, setError] = useState(false);
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);
  const [coords, setCoords] = useState<Coord>({
    lat: company.lat,
    lng: company.lng,
  });

  const onDropdownChange = (_values: MultiValue<ISelect>) => {
    setValues(_values as ISelect[]);
  };

  const dispatch = useDispatch();

  const apiUrl = useApiUrl();

  const navigation = useNavigate();

  const latlngFromAddress = useCallback(async (address: string) => {
    try {
      const res = await Geocode.fromAddress(address);
      const { lat, lng } = res.results[0].geometry.location;
      if (mounted.current) {
        setCoords({ lat, lng });
        setError(false);
      }
    } catch (err) {
      if (mounted.current) {
        setError(true);
      }
    }
  }, []);

  useEffect(() => {
    if (address) debounce(() => latlngFromAddress(address))();
  }, [address, latlngFromAddress]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Container
      width="100%"
      heigh="calc(100% - 30px)"
      justify="center"
      align="center"
      direction="column"
    >
      <Container
        width="100%"
        justify="center"
        align="center"
        heigh="100%"
        direction="column"
      >
        <Txt fs="28px" bold color="#000000" margin="0px 0px 35px 0px">
          Edit Information
        </Txt>
        <Container
          justify="center"
          width="50%"
          align="center"
          direction="column"
          style={{
            maxWidth: 400,
          }}
        >
          <Container
            width="100%"
            justify="flex-start"
            align="flex-start"
            direction="column"
          >
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Name
            </Txt>
            <TextInput
              style={{ border: "1px solid #C4C4C4", height: "34px" }}
              margin="0px 0px 20px 0px"
              padding="0px 0px 0px 10px"
              type="text"
              color="#000000"
              fs="16px"
              width="99%"
              borderRadius="4px"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Address
            </Txt>
            <TextInput
              style={{ border: "1px solid #C4C4C4", height: "34px" }}
              margin="0px 0px 20px 0px"
              padding="0px 0px 0px 10px"
              type="text"
              color="#000000"
              fs="16px"
              width="99%"
              borderRadius="4px"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Materials
            </Txt>
            <div style={{ width: "99%", margin: "0px 0px 20px 0px" }}>
              <Select
                value={values}
                options={options}
                onChange={onDropdownChange}
                isMulti
              />
            </div>
            <Btn
              type="submit"
              bg="#FF6347"
              width="99%"
              height="30px"
              borderRadius="4px"
              margin="20px 0px 0px 0px"
              onClick={async () => {
                if (!error) {
                  const res = await Put<{
                    ok: boolean;
                    result: FCompany;
                    error?: IError;
                  }>(
                    apiUrl,
                    "/auth/edit-company",
                    {
                      name: name,
                      address: address,
                      materials: values.map((v) => v.value),
                      lat: coords.lat,
                      lng: coords.lng,
                    },
                    company.token,
                  );
                  if (res.data.ok) {
                    if (mounted.current) {
                      dispatch(saveCompany(res.data.result));
                      navigation("/main/dashboard");
                    }
                  }
                } else {
                  // eslint-disable-next-line no-alert
                  alert("Please enter a valid address");
                }
              }}
            >
              <Txt color="#000000" fs="16px" pointer>
                Save Changes
              </Txt>
            </Btn>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
