import React from 'react';
import {PropsWithChildren, PropsWithLayout} from '../../core';

const InjectLayout: React.FC<PropsWithLayout<PropsWithChildren>> = ({
  children,
  dir,
}) => {
  if (dir !== 'rtl') {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const toArrayChildren = React.Children.toArray(children);
  return (
    <React.Fragment>
      {toArrayChildren.map((child, index) => {
        if (React.isValidElement(child)) {
          const key = child?.key ?? `injected-${index}`;
          const newProps = {...(child?.props || {}), key};
          if (!child?.props?.dir) {
            Object.assign(newProps, {dir});
          }
          return React.cloneElement<unknown>(child, newProps);
        } else {
          return child;
        }
      })}
    </React.Fragment>
  );
};

export default React.memo(InjectLayout);
