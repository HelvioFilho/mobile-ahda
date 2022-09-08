import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface LoadProps {
  size: number;
}

export function Load({size}: LoadProps){
  const theme = useTheme();
  return (
    <ActivityIndicator 
      color={theme.colors.tabBarColor.active}
      size={size}
      style={{ flex: 1 }}
    />
  );
}