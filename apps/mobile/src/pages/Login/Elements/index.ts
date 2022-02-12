import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-top: 70px;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const LogoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #acacac;
  width: 100%;
  padding-bottom: 20px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 179px;
`;
