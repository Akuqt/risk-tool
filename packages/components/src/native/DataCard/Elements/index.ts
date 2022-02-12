import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0px;
  align-items: center;
`;

export const ChartContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  margin-bottom: 30px;
`;

export const LabelsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0px 10px;
`;

export const LabelSpan = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 4px 0px 4px 10px;
  color: #000000;
`;
