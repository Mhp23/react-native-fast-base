import React from 'react';
import Divider from '../Divider';
import {useRM} from 'react-native-full-responsive';
import {DefaultSizes, GapProps, PropsWithChildren} from '../../core';

const DEFAULT_SPACE = 5;

const Gap: React.FC<PropsWithChildren<GapProps>> = ({
  children,
  mode = 'V',
  space = 'xs',
  dividerProps,
  reversed = false,
  behavior = 'divider',
}) => {
  const {rs} = useRM();

  const toArray = React.Children.toArray(children);

  const childrens = reversed ? toArray.reverse() : toArray;

  return (
    <React.Fragment>
      {childrens.map((child, index) => {
        if (React.isValidElement(child)) {
          const key = child?.key ?? `gap-i-${index}`;
          const isThreshold = index === toArray?.length - 1;
          const spaceValue =
            (typeof space === 'number' ? space : DefaultSizes[space]) ||
            DEFAULT_SPACE;
          if (behavior === 'style' && child.type !== React.Fragment) {
            const responsiveValue = rs(spaceValue);
            const style = isThreshold
              ? {}
              : mode === 'H'
              ? {marginEnd: responsiveValue}
              : {marginBottom: responsiveValue};
            return React.cloneElement<any>(child, {
              key,
              style: {...child.props.style, ...style},
            });
          } else {
            const DividerComponent = (
              <Divider
                mode="padding"
                width={spaceValue / 2}
                direction={mode === 'H' ? 'horizontal' : 'vertical'}
                {...dividerProps}
              />
            );
            return (
              <React.Fragment key={key}>
                {child}
                {!isThreshold && DividerComponent}
              </React.Fragment>
            );
          }
        } else {
          return child;
        }
      })}
    </React.Fragment>
  );
};

export default React.memo(Gap);
