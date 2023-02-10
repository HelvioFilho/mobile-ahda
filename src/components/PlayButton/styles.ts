import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  top: -30px;
  width: 70px;
  height: 70px;
  border-radius: 35px;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tabBarColor.active};
`;

export const Button = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;

  justify-content: center;
  align-items: center;
`;