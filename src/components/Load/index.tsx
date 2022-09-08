import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface LoadProps {
  size: number;
  player?: boolean;
}

export function Load({size, player=false}: LoadProps){
  const theme = useTheme();
  return (
    <ActivityIndicator 
      color={theme.colors.tabBarColor[player ? 'player':'active']}
      size={size}
      style={{ flex: 1 }}
    />
  );
}