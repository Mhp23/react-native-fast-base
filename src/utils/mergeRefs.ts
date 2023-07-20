import type {MutableRefObject, LegacyRef, RefCallback} from 'react';

const mergeRefs = <T = any>(
  refs: Array<MutableRefObject<T> | LegacyRef<T>>,
): RefCallback<T> => {
  return node => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
};

export default mergeRefs;
