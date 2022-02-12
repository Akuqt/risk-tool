import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: #ff634733;
  border-radius: 5px;
  padding: 20px 10px;
`;

export const Information = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const AvatarContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
`;

export const MainLabels = styled.View`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 4px;
  color: #000000;
`;
