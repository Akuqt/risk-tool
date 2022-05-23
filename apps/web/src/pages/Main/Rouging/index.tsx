import React, { useState, useEffect, useRef } from "react";
import { formatNumber, getDriver } from "../../../utils";
import { Container, Spinner } from "components/src/Elements";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApiUrl } from "../../../hooks";
import { RouteCard } from "components";
import { RootState } from "../../../redux";
import { BestRoute } from "types";
import { Get } from "services";

export const Rouging: React.FC = () => {
  const mounted = useRef(false);
  const [routes, setRoutes] = useState<BestRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  const apiUrl = useApiUrl();
  const navigation = useNavigate();

  useEffect(() => {
    Get<{ ok: boolean; result: BestRoute[] }>(
      apiUrl,
      "/path/all",
      company.token,
    ).then((res) => {
      if (res.data.ok) {
        if (mounted.current) {
          setRoutes(res.data.result.reverse());
          setLoading(false);
        }
      }
    });
  }, [company.token, apiUrl]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <Container width="100%" heigh="100%" justify="center" align="center">
          <Spinner color="#000000" borderHeight="4px" radius="100px" />
        </Container>
      ) : (
        <Container
          width="100%"
          justify="center"
          align="center"
          direction="column"
          padding="20px 0px"
          bg="#e7e7e7"
        >
          {routes.map((route, index) => (
            <RouteCard
              origin={company.address}
              formatNumber={(n) => formatNumber(n, 2, "")}
              bg="#f5f5f5"
              data={route}
              width="90%"
              key={index}
              margin="10px 0px"
              getDriver={(id) => {
                const driver = getDriver(id, company.drivers);
                return driver ? driver.name + " " + driver?.lastname : "";
              }}
              actions={{
                view: () => {
                  navigation("/main/general", {
                    state: {
                      route: {
                        ...route,
                      },
                    },
                  });
                },
              }}
            />
          ))}
        </Container>
      )}
    </>
  );
};
