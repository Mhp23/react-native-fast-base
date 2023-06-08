import type {StyleProp, ViewStyle} from 'react-native';
import {makeStyle} from '../maker/style';

describe('makeStyles function tests', () => {
  it('should be remove undefined and zero values from styles', () => {
    const styles: StyleProp<ViewStyle> = {
      padding: undefined,
      margin: undefined,
      left: null,
      paddingBottom: 0,
      paddingStart: 3,
    };
    expect(makeStyle(styles)).toMatchObject({
      paddingStart: 3,
    });
  });
});
