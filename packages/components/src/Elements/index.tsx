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
  borderBottom?: boolean;
  borderBottomColor?: string;
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
  border-bottom: ${(p) => (p.borderBottom ? "1px" : "0px")} solid
    ${(p) => p.borderBottomColor || "transparent"};
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

export const Slct = styled.select`
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #ff6347;
  color: #000000;
  width: 100%;
  margin: 20px 0px 5px 0px;
  border-radius: 1px;
  font-size: 16px;

  option {
    color: #a3a3a3;
    border: none;
    outline: none;
    background: transparent;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const Card = styled.div`
  margin: 2rem 2rem 2rem 0;
  padding: 1.5rem;
  width: 230px;
  box-shadow: 0 0 28px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-radius: 4px;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CardCtnr = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
