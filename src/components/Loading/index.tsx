import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';


type LoadingProps = {
  size: number;
  player?: boolean;
}

export function Loading({ size, player }: LoadingProps) {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      color={colors.tabBarColor[player ? 'player' : 'active']}
      size={size}
      style={{ flex: 1 }}
    />
  );
}