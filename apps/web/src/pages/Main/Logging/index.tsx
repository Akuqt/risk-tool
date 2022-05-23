import React, { useState, useEffect, useCallback, useRef } from "react";
import Geocode from "react-geocode";
import config from "../../../config";
import toast from "react-hot-toast";
import { filterLogs, RootState, updateDriverState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress, getDriver } from "../../../utils";
import { useApiUrl, useSocket } from "../../../hooks";
import { Container, Spinner } from "components/src/Elements";
import { FLog2, IError } from "types";
import { useNavigate } from "react-router-dom";
import { Get, Put } from "services";
import { LogCard } from "components";

Geocode.setApiKey(config.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("co");

export const Logging: React.FC = () => {
  const mounted = useRef(false);
  const [logs, setLogs] = useState<FLog2[]>([]);
  const [loading, setLoading] = useState(true);
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

  const apiUrl = useApiUrl();
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleDismiss = useCallback(
    async (log: FLog2 | null) => {
      if (log) {
        const res = await Put<{ ok: boolean; error?: IError }>(
          apiUrl,
          "/alerts/edit",
          {
            action: "Dismiss",
            log: log.id,
          },
          company.token,
        );
        if (res.data.ok) {
          if (mounted.current) {
            dispatch(filterLogs(log.id));
            setLogs((lgs) =>
              lgs.map((l) =>
                l.id === log.id ? { ...l, action: "Dismiss" } : l,
              ),
            );
          }
        } else {
          toast.error(res.data.error?.message || "", {
            id: "logg-error-data-add",
            position: "bottom-right",
          });
        }
      }
    },
    [company.token, dispatch, apiUrl],
  );

  const addressFromLatLng = useCallback(async (lat: number, lng: number) => {
    try {
      const { results } = await Geocode.fromLatLng(
        lat.toString(),
        lng.toString(),
      );
      if (mounted.current) {
        const address = formatAddress(results[0].formatted_address as string);
        return address;
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        id: "error-logg-address",
        position: "bottom-right",
      });
    }
    return "";
  }, []);

  useEffect(() => {
    Get<{ ok: boolean; logs: FLog2[]; error?: IError }>(
      apiUrl,
      "alerts/all",
      company.token,
    ).then((res) => {
      if (res.data.ok) {
        if (mounted.current) {
          setLogs(res.data.logs);
          setLoading(false);
        }
      } else {
        toast.error(res.data.error?.message || "", {
          id: "loggg-error-logs-g",
          position: "bottom-right",
        });
      }
    });
  }, [company.token, apiUrl]);

  useEffect(() => {
    socket?.on("company:newAlert", (data) => {
      if (data.company === company.id) {
        if (mounted.current) {
          setLogs((prev) => [data.log, ...prev]);
        }
      }
    });
  }, [socket, company.id]);

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
          {logs.map((log, index) => (
            <LogCard
              getAddress={addressFromLatLng}
              bg="#f5f5f5"
              data={log}
              width="90%"
              key={index}
              margin="10px 0px"
              getDriver={(id) => {
                const driver = getDriver(id, company.drivers);
                return driver ? driver.name + " " + driver?.lastname : "";
              }}
              actions={{
                dismiss: async () => await handleDismiss(log),
                recalculate: () => {
                  dispatch(
                    updateDriverState({ id: log?.driver || "", active: false }),
                  );
                  navigation("/main/planner", {
                    state: {
                      log: { ...log },
                    },
                  });
                },
                view: (address) => {
                  navigation("/main/general", {
                    state: {
                      log: { ...log, address },
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
