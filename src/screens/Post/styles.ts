import styled, { css } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

type CoverProps = {
  height: number;
}

type CoverWrapperProps = {
  width: number;
}

export const Container = styled.View`
  position: relative;
  width: 100%;
  top: -100px;
  border-top-right-radius: 60px;
  border-top-left-radius: 60px;
  margin-bottom: -50px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Title = styled.Text`
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  margin: 15px 25px 0;
`;

export const CoverWrapper = styled.View<CoverWrapperProps>`
  width: ${({ width }) => width}px;
  justify-content: center;
  align-items: center;
`;

export const Cover = styled(FastImage) <CoverProps>`
  width: 100%;
  height: ${({ height }) => RFValue(height)}px;
`;

export const ContainerRender = styled.View`
  padding: 30px 0 0;
  margin-bottom: 20px;
`;

export const ContainerGallery = styled.View`
  padding: 0 0 30px;
`;

export const TitleGallery = styled.Text`
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  padding: 0 20px 0;
`;

export const Published = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.text_light};
  margin: 20px 20px 0;
  padding-bottom: 5px;
  border-radius: 40px;
`;

export const ContainerAvatar = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin: 20px 20px 15px;
`;

export const Avatar = styled(FastImage)`
  width: 60px;
  height: 60px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  align-self: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const AboutWrapper = styled.View`
  margin: 0 10px 20px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const About = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${RFValue(60)}px;
  left: ${RFValue(15)}px;
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(15)}px;
  border-width: 1px;
  ${({ theme }) => css`
    border-color: ${theme.colors.light};
    background-color: ${theme.colors.tabBarColor.active};
  `}
`;