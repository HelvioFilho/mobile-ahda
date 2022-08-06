import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 10px 0;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: ${({theme}) => theme.colors.light};
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: bold;
`;

export const Cover = styled.Image`
  width: 100%;
  height: 250px;
`;

export const Preview = styled.Text`
  margin-top: -10px;
  padding: 4px 5px;
  font-size: 16px;
`;
export const Date = styled.Text`
  font-size: 14px;
  padding: 7px 6px;
  text-align: center;
`;
export const User = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.light};
  padding: 8px 4px;
`;

export const ContainerUser = styled.View`
  top: -20px;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  width: auto;
  background-color: ${({theme}) => theme.colors.tabBarColor.active };
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Separator = styled.View`
  border-width: .8px;
  border-top-color: black;
  width: 80%;
  align-self: center;
  margin: 8px 0;
`;