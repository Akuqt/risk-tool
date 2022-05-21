import React, { useEffect } from "react";
import { BsPencil, BsBoxArrowUpRight } from "react-icons/bs";
import { Btn, Container, Txt } from "components/src/Elements";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useSocket } from "../../../hooks";

export const Dashboard: React.FC = () => {
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const navigation = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("company:newAlert", (data) => {
      if (data.company === company.id) {
        company.logs.push(data.log);
      }
    });
  }, [socket, company]);

  return (
    <Container
      width="100%"
      heigh="calc(100% - 30px)"
      align="flex-start"
      justify="flex-start"
      direction="row"
    >
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
          <BsPencil color="#000000a0" size={16} />
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
            <BsBoxArrowUpRight color="#00000033" size={14} />
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
      </Container>
      <Container
        style={{ position: "relative", flexWrap: "wrap", minWidth: "600px" }}
        bg="#c4c4c450"
        width="75%"
        heigh="100%"
        padding="10px 40px 0px 15px"
        align="center"
        justify="center"
        direction="column"
      >
        <Txt fs="20px" bold color="black">
          TODO
        </Txt>
      </Container>
    </Container>
  );
};
