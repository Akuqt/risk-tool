import styled from "styled-components/native";

export const Button = styled.TouchableOpacity<{
  bg: string;
  width: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.bg};
  width: ${(p) => p.width};
  height: 40px;
  border-radius: 5px;
`;

export const Label = styled.Text<{
  color: string;
  fz?: string;
  bold?: boolean;
}>`
  font-size: ${(p) => (p.fz ? p.fz : "20px")};
  font-weight: ${(p) => (p.bold ? "bold" : "normal")};
  color: ${(p) => p.color};
`;
