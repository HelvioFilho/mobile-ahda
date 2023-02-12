import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

type LoadingProps = ActivityIndicatorProps & {
  size: number;
  player?: boolean;
}

export function Loading({ size, player, ...rest }: LoadingProps) {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      color={colors.tabBarColor[player ? 'player' : 'active']}
      size={size}
      style={{ flex: 1 }}
      {...rest}
    />
  );
}