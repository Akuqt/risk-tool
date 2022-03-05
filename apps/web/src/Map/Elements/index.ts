import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserLocation = styled.button`
  position: absolute;
  right: 10px;
  bottom: 210px;
  z-index: 100;
  background-color: white;
  border: none;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  box-shadow: 0px 0px 2px #00000090;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    transition: transform 200ms ease-in-out;
  }
  &:hover {
    & > svg {
      transform: rotate(45deg);
    }
  }
`;
