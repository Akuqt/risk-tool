import styled from "styled-components/native";

export const InputGroup = styled.View<{ lm?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: ${(p) => (p.lm ? "6px 0px" : "20px 0px")};
  position: relative;
`;

export const Input = styled.TextInput`
  background-color: #c4c4c4;
  width: 330px;
  height: 40px;
  font-size: 16px;
  color: #000;
`;

export const IconP = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  left: 290px;
  top: 22px;
`;

export const Label = styled.Text<{ btn?: boolean }>`
  color: #000000;
  font-weight: 500;
  line-height: 15px;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const Help = styled.TouchableOpacity`
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const HelpTxt = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 4px;
  color: tomato;
`;
