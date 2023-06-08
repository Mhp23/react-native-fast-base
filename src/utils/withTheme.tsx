import React from 'react';
import {useTheme} from '../hooks';
import type {MappedType, ThemeContentProps} from '../core';

const withTheme = <P extends object, T extends MappedType = {}>(
  Component: React.ComponentType<P>,
) => {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithMethods = (props: Omit<P, keyof ThemeContentProps<T>>) => {
    const theme = useTheme();

    return <Component {...(props as P)} {...theme} />;
  };

  ComponentWithMethods.displayName = `withTheme(${displayName})`;

  return ComponentWithMethods;
};

export default withTheme;
