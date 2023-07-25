import React from 'react';
import Divider from '../Divider';
import {useRM} from 'react-native-full-responsive';
import {DefaultSizes, GapProps, PropsWithChildren} from '../../core';

const Gap: React.FC<PropsWithChildren<GapProps>> = ({
  children,
  mode = 'V',
  space = 'xs',
}) => {
  const {rs} = useRM();

  const toArray = React.Children.toArray(children);

  return (
    <React.Fragment>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const key = child?.key ?? `gap-i-${index}`;
          const spaceValue =
            typeof space === 'number' ? space : DefaultSizes[space];
          if (child.type === React.Fragment) {
            return (
              <React.Fragment key={key}>
                {child}
                {index !== toArray?.length - 1 && (
                  <Divider
                    mode="padding"
                    width={spaceValue / 2}
                    direction={mode === 'H' ? 'horizontal' : 'vertical'}
                  />
                )}
              </React.Fragment>
            );
          } else {
            const style =
              index === toArray?.length - 1
                ? {}
                : mode === 'H'
                ? {marginEnd: rs(spaceValue)}
                : {marginBottom: rs(spaceValue)};
            return React.cloneElement<any>(child, {
              key,
              style: {...child.props.style, ...style},
            });
          }
        } else {
          return child;
        }
      })}
    </React.Fragment>
  );
};

export default React.memo(Gap);
