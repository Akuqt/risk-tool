import React, { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BsPencil, BsBoxArrowUpRight } from "react-icons/bs";
import { Btn, Container, Txt, TxtBtn } from "components/src/Elements";
import { useDispatch, useSelector } from "react-redux";
import { FLog2, IError } from "types";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "components";
import { IoIosLogOut } from "react-icons/io";
import { useApiUrl } from "../../../hooks";
import { getDriver } from "../../../utils";
import { Put, Get } from "services";
import { Table } from "./Table";
import { Alert } from "./Alert";
import { Line } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import {
  saveLogs,
  RootState,
  filterLogs,
  clearCompany,
  updateDriverState,
} from "../../../redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Dashboard: React.FC = () => {
  const mounted = useRef(false);

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = useApiUrl();

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<FLog2 | null>(null);

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
          }
        } else {
          toast.error(res.data.error?.message || "", {
            id: "dash-error-alerts",
            position: "bottom-right",
          });
        }
      }
    },
    [company.token, dispatch, apiUrl],
  );

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    Get<{ ok: boolean; logs: FLog2[]; error?: IError }>(
      apiUrl,
      "/alerts/all",
      company.token,
    ).then((res) => {
      if (res.data.ok) {
        if (mounted.current) {
          dispatch(saveLogs(res.data.logs));
        }
      } else {
        toast.error(res.data.error?.message || "", {
          id: "dash-error-alerts",
          position: "bottom-right",
        });
      }
    });
  }, [dispatch, apiUrl, company.token]);

  return (
    <Container
      width="100%"
      heigh="calc(100% - 30px)"
      align="flex-start"
      justify="flex-start"
      direction="row"
    >
      <CustomModal show={showModal} bg="#2c2c2cac">
        <Alert
          width="20%"
          alert={alert}
          actions={{
            dismiss: () => {
              if (mounted.current) {
                setShowModal(false);
                handleDismiss(alert);
              }
            },
            view: (address) => {
              if (mounted.current) {
                setShowModal(false);
                navigation("/main/general", {
                  state: {
                    log: { ...alert, address },
                  },
                });
              }
            },
            recalculate: () => {
              if (mounted.current) {
                setShowModal(false);
                dispatch(
                  updateDriverState({ id: alert?.driver || "", active: false }),
                );
                navigation("/main/planner", {
                  state: {
                    log: { ...alert },
                  },
                });
              }
            },
            close: () => {
              if (mounted.current) {
                setShowModal(false);
              }
            },
          }}
        />
      </CustomModal>
      <Container
        style={{ position: "relative", flexWrap: "wrap", minWidth: "200px" }}
        bg="#c4c4c422"
        width="25%"
        heigh="100%"
        padding="10px 40px 0px 15px"
        align="center"
        justify="flex-start"
        direction="column"
      >
        <Btn
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
          onClick={() => {
            navigation("/main/edit");
          }}
        >
          <BsPencil color="#0094FF" size={18} />
        </Btn>
        <Container
          width="100%"
          align="center"
          justify="space-between"
          margin="0px 0px 5px 0px"
          style={{ flexWrap: "wrap" }}
        >
          <Txt fs="20px" bold color="#000000">
            {company.name}
          </Txt>
          <Txt fs="15px" color="#000000">
            {company.address}
          </Txt>
        </Container>
        <Container
          width="100%"
          align="center"
          justify="flex-start"
          margin="5px 0px"
        >
          <Txt fs="16px" color="#000000" margin="0px 5px 0px 0px">
            {company.drivers.length} Drivers
          </Txt>
          <Btn
            onClick={() => {
              navigation("/main/driver");
            }}
          >
            <BsBoxArrowUpRight color="#0094FF" size={15} />
          </Btn>
        </Container>
        <Container
          width="100%"
          align="flex-start"
          justify="space-between"
          margin="5px 0px"
        >
          <Txt fs="16px" color="#000000">
            Materials:
          </Txt>
        </Container>
        <Container
          style={{
            flexWrap: "wrap",
          }}
          width="100%"
          align="center"
          justify="flex-start"
        >
          {company.materials.length > 0 ? (
            company.materials.map((material) => (
              <Container
                key={material}
                margin="4px"
                justify="center"
                align="center"
                bg="#d3d3d39f"
                padding="4px 6px"
                width="fit-content"
              >
                <Txt fs="16px" color="#000000">
                  {material}
                </Txt>
              </Container>
            ))
          ) : (
            <Txt fs="16px" color="#000000" margin="0px 0px 0px 8px">
              No Materials
            </Txt>
          )}
        </Container>
        <Container
          width="100%"
          justify="center"
          align="center"
          style={{ position: "absolute", bottom: 50, left: 0 }}
        >
          <Btn
            onClick={() => {
              dispatch(clearCompany());
            }}
          >
            <Txt fs="16px " color="#000000" bold pointer>
              Log out
            </Txt>{" "}
            <IoIosLogOut color="#000000" size={30} />
          </Btn>
        </Container>
      </Container>
      <Container
        style={{
          position: "relative",
          flexWrap: "wrap",
          minWidth: "800",
          overflow: "hidden",
          overflowY: "auto",
        }}
        bg="#c4c4c450"
        width="75%"
        heigh="100%"
        padding="10px"
        align="center"
        justify="center"
        direction="column"
      >
        <Container
          width="100%"
          heigh="50%"
          align="flex-start"
          justify="flex-start"
          direction="column"
        >
          <Container width="100%" justify="space-between" align="center">
            <Txt fs="20px" bold color="#000000" margin="5px 0px 20px 10px">
              Last Risks
            </Txt>
            <TxtBtn
              color="#0094FF"
              margin="10px 10px 20px 0px"
              onClick={() => {
                navigation("/main/rouging");
              }}
            >
              Details
            </TxtBtn>
          </Container>
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Line
              options={{
                backgroundColor: "transparent",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    max: 100,
                    min: 0,
                    title: {
                      display: true,
                      text: "Risk   ( % )",
                      align: "center",
                      color: "#000000",
                      font: {
                        weight: "bold",
                        family: "open sans",
                        size: 15,
                      },
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.25, // bezier curves
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: company.lastRoutes?.map((route) =>
                  new Date(route.date).toLocaleString(),
                ),
                datasets: [
                  {
                    label: "Risk",
                    data: company.lastRoutes?.map((route) => route.risk),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
          </div>
        </Container>
        <Container
          width="100%"
          heigh="50%"
          align="flex-start"
          justify="flex-start"
          direction="column"
        >
          <Container width="100%" justify="space-between" align="center">
            <Txt fs="20px" bold color="#000000" margin="10px 0px 20px 10px">
              Last Alerts
            </Txt>
            <TxtBtn
              color="#0094FF"
              margin="10px 10px 20px 0px"
              onClick={() => {
                navigation("/main/logging");
              }}
            >
              Details
            </TxtBtn>
          </Container>
          <Table
            data={company.logs
              ?.filter((u) => u.action === "None")
              .map((log) => ({
                date: new Date(log.createdAt).toLocaleString(),
                driver: (() => {
                  const driver = getDriver(log.driver, company.drivers);
                  return driver ? driver.name + " " + driver.lastname : "";
                })(),
                event: {
                  id: log.id,
                  reason: log.alert.reason,
                },
                actions: {
                  more: () => {
                    if (mounted.current) {
                      setAlert(log);
                      setShowModal(true);
                    }
                  },
                  dismiss: async () => await handleDismiss(log),
                },
              }))}
          />
        </Container>
      </Container>
    </Container>
  );
};
