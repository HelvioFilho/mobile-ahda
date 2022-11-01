import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

interface CoverProps {
  height: number;
}

export const Container = styled.View`
  position: relative;
  width: 100%;
  top: -110px;
  border-top-right-radius: 60px;
  border-top-left-radius: 60px;
  background-color: ${({ theme }) => theme.colors.light};
  margin-bottom: -50px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Bold};
  font-size: ${RFValue(26)}px;
  text-align: center;
  margin: 15px 25px 0;
`;

export const CoverWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
  align-items: center;
`;

export const Cover = styled(FastImage) <CoverProps>`
  width: 100%;
  height: ${({ height }) => RFValue(height)}px;
  /* height: ${RFValue(300)}px; */
`;

export const ContainerRender = styled.View`
  padding: 30px 0 0;
  margin-bottom: 20px;
`;

export const ContainerGallery = styled.View`
  padding: 0 0 30px;
`;

export const TitleGallery = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.Bold};
  font-size: ${RFValue(26)}px;
  padding: 0 20px 0;
`;

export const Published = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.Regular};
  font-size: ${RFValue(12)}px;
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
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${RFValue(14)}px;
  align-self: center;
`;

export const AboutWrapper = styled.View`
  margin: 0 10px 20px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const About = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Regular};
  font-size: ${RFValue(14)}px;  
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
  border-color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.tabBarColor.active};
`;