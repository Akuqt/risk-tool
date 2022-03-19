import styled from "styled-components";
import { Align, Justify } from "types";

export const Container = styled.div<{
  justify: Justify;
  align: Align;
  width: string;
  heigh?: string;
  padding?: string;
  margin?: string;
  bg?: string;
  borderRadius?: string;
  shadow?: boolean;
  direction?: "row" | "column" | "row-reverse";
}>`
  display: flex;
  justify-content: ${(p) => p.justify};
  align-items: ${(p) => p.align};
  flex-direction: ${(p) => p.direction || "row"};
  width: ${(p) => p.width};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  background-color: ${(p) => p.bg || "transparent"};
  border-radius: ${(p) => p.borderRadius || "0px"};
  height: ${(p) => p.heigh || "auto"};
  box-shadow: ${(p) => (p.shadow ? "4px 4px 9px -5px #000000" : "none")};
`;

export const Txt = styled.p<{
  fs: string;
  bold?: boolean;
  color: string;
  margin?: string;
  pointer?: boolean;
}>`
  color: ${(p) => p.color};
  font-size: ${(p) => p.fs};
  font-weight: ${(p) => (p.bold ? "bold" : "normal")};
  margin: ${(p) => p.margin || "0px"};
  cursor: ${(p) => (p.pointer ? "pointer" : "default")};
`;

export const TextInput = styled.input<{
  color: string;
  bg?: string;
  fs: string;
  width: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  borderBottom?: boolean;
  borderBottomColor?: string;
  placerholderColor?: string;
}>`
  border: none;
  outline: none;
  color: ${(p) => p.color};
  background-color: ${(p) => p.bg || "transparent"};
  font-size: ${(p) => p.fs};
  width: ${(p) => p.width};
  border-radius: ${(p) => p.borderRadius || "0px"};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  border-bottom: ${(p) => (p.borderBottom ? "1px" : "0xp")} solid
    ${(p) => p.borderBottomColor || "transparent"};
  &::placeholder {
    color: ${(p) => p.placerholderColor || p.color + "90"};
    font-size: calc(${(p) => p.fs} - 1px);
  }
`;

export const Btn = styled.button<{
  bg?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
}>`
  height: ${(p) => p.height || "auto"};
  width: ${(p) => p.width || "fit-content"};
  background-color: ${(p) => p.bg || "transparent"};
  border-radius: ${(p) => p.borderRadius || "0px"};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => (p.bg ? p.bg + "c0" : "transparent")};
  }
`;

export const Img = styled.img<{ width: string; pointer?: boolean }>`
  width: ${(p) => p.width};
  cursor: ${(p) => (p.pointer ? "pointer" : "default")};
`;
