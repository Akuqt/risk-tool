import React from "react";
import { Container, Txt, Btn } from "components/src/Elements";
import { AiOutlineClose } from "react-icons/ai";

interface IState {
  stt: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<IState> = ({ stt, changeState, children }) => {
  return (
    <>
      {stt && (
        <Container
          style={{ position: "fixed", top: "0", left: "0" }}
          width="100%"
          heigh="100%"
          bg="rgba(0, 0, 0, .5)"
          padding="40px"
          justify="center"
          align="center"
        >
          <Container
            style={{ position: "relative" }}
            width="25%"
            heigh="82%"
            bg="#ffffff"
            borderRadius="5px"
            shadow
            padding="20px"
            justify="center"
            align="center"
          >
            <Container
              style={{ position: "absolute", top: "20px", left: "20px" }}
              justify="flex-start"
              align="flex-start"
              margin="0px 0px 20px 0px"
              padding="0px 0px 20px 0px"
              borderBottom
              borderBottomColor="#E8E8E8"
              width="87%"
              heigh="10%"
            >
              <Txt fs="22px" color="#000000">
                Register New Driver
              </Txt>
            </Container>
            <Btn
              onClick={() => changeState(false)}
              style={{ position: "absolute", top: "20px", right: "20px" }}
            >
              <AiOutlineClose color="#000000a0" size={18} />
            </Btn>
            {children}
          </Container>
        </Container>
      )}
    </>
  );
};
