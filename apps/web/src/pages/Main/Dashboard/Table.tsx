import {
  Container,
  CTable,
  CTd,
  CTh,
  CThead,
  Txt,
  TxtBtn,
} from "components/src/Elements";
import React from "react";

interface Props {
  data: {
    driver: string;
    date: string;
    event: { id: string; reason: string };
    actions?: {
      dismiss: () => void;
      more: () => void;
    };
  }[];
}

export const Table: React.FC<Props> = ({ data }) => {
  return (
    <Container width="100%" align="center" justify="center">
      <CTable>
        <CThead>
          <tr>
            <CTh>
              <Container width="100%" justify="center" align="center">
                <Txt fs="16px" color="#000000" bold>
                  Driver
                </Txt>
              </Container>
            </CTh>
            <CTh>
              <Container width="100%" justify="center" align="center">
                <Txt fs="16px" color="#000000" bold>
                  Date
                </Txt>
              </Container>
            </CTh>
            <CTh>
              <Container width="100%" justify="center" align="center">
                <Txt fs="16px" color="#000000" bold>
                  Event
                </Txt>
              </Container>
            </CTh>
            <CTh>
              <Container width="100%" justify="center" align="center">
                <Txt fs="16px" color="#000000" bold>
                  Action
                </Txt>
              </Container>
            </CTh>
          </tr>
        </CThead>
        <tbody>
          {data?.slice(0, 10).map((dt, i) => (
            <tr key={i}>
              <CTd>
                <Container width="100%" justify="center" align="center">
                  <Txt fs="16px" color="#000000">
                    {dt.driver}
                  </Txt>
                </Container>
              </CTd>
              <CTd>
                <Container width="100%" justify="center" align="center">
                  <Txt fs="16px" color="#000000">
                    {dt.date}
                  </Txt>
                </Container>
              </CTd>
              <CTd>
                <Container width="100%" justify="center" align="center">
                  <Txt fs="16px" color="#000000">
                    {dt.event.reason}
                  </Txt>
                </Container>
              </CTd>
              <CTd>
                <Container width="100%" justify="center" align="center">
                  {dt.actions?.dismiss && (
                    <TxtBtn
                      color="#0094FF"
                      margin="0px 10px"
                      onClick={() => dt.actions?.dismiss()}
                    >
                      Dismiss
                    </TxtBtn>
                  )}
                  {dt.actions?.more && (
                    <TxtBtn
                      color="#0094FF"
                      margin="0px 10px"
                      onClick={() => dt.actions?.more()}
                    >
                      More
                    </TxtBtn>
                  )}
                </Container>
              </CTd>
            </tr>
          ))}
        </tbody>
      </CTable>
    </Container>
  );
};
