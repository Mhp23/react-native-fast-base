import {TextStyle, ViewStyle} from 'react-native';
import {makeLayoutStyle, makeTextStyle} from '../maker/layout';

const mockStyle: ViewStyle = {
  borderWidth: 2,
  borderRightWidth: 2.5,
  borderLeftWidth: 1.5,
  borderStartWidth: 1.5,
  borderEndWidth: 2.5,
  borderTopWidth: 1,
  borderBottomWidth: 3,
  borderColor: '#000000',
  borderTopColor: '#FF0000',
  borderBottomColor: '#00FF00',
  borderLeftColor: '#0000FF',
  borderRightColor: '#FFFF00',
  borderStartColor: '#0000FF',
  borderEndColor: '#FFFF00',
  borderRadius: 10,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 30,
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 50,
  padding: 20,
  paddingTop: 10,
  paddingRight: 15,
  paddingBottom: 25,
  paddingLeft: 30,
  margin: 10,
  marginTop: 5,
  marginRight: 10,
  marginBottom: 15,
  marginLeft: 20,
  marginEnd: 5,
  marginStart: 10,
  paddingEnd: 10,
  paddingStart: 15,
};
const toRTLStyle: ViewStyle = {
  marginLeft: 10,
  marginRight: 20,
  paddingLeft: 15,
  paddingRight: 30,
  borderWidth: 2,
  borderRightWidth: 1.5,
  borderLeftWidth: 2.5,
  borderEndWidth: 1.5,
  borderStartWidth: 2.5,
  borderTopWidth: 1,
  borderBottomWidth: 3,
  borderColor: '#000000',
  borderTopColor: '#FF0000',
  borderLeftColor: '#FFFF00',
  borderRightColor: '#0000FF',
  borderBottomColor: '#00FF00',
  borderEndColor: '#0000FF',
  borderStartColor: '#FFFF00',
  borderRadius: 10,
  padding: 20,
  paddingStart: 10,
  paddingEnd: 15,
  paddingTop: 10,
  paddingBottom: 25,
  margin: 10,
  marginStart: 5,
  marginEnd: 10,
  marginTop: 5,
  marginBottom: 15,
  borderBottomRightRadius: 40,
  borderBottomLeftRadius: 50,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 20,
};

describe('make layout style tests', () => {
  it('should to makeLayoutStyle correctly', () => {
    expect(makeLayoutStyle(mockStyle, 'rtl')).toStrictEqual(toRTLStyle);
  });

  it('should to works correctly for array of styles', () => {
    expect(makeLayoutStyle([mockStyle, {}, []], 'rtl')).toStrictEqual(
      toRTLStyle,
    );
  });

  it('should ignore change styles in when direction ltr', () => {
    expect(makeLayoutStyle(mockStyle, 'ltr')).toMatchObject(mockStyle);
  });

  it('should accept undefined and null values', () => {
    const rtlStyles = makeLayoutStyle(
      {
        marginBottom: undefined,
        left: 5,
        padding: 10,
        paddingLeft: 15,
        margin: null,
        marginLeft: undefined,
      },
      'rtl',
    );
    expect(rtlStyles).toStrictEqual({
      marginRight: undefined,
      marginBottom: undefined,
      right: 5,
      padding: 10,
      paddingRight: 15,
      margin: null,
    });
  });
});

const mockTextStyles: TextStyle = {
  textAlign: 'left',
  paddingRight: 12,
  margin: 9,
  alignSelf: 'flex-end',
  fontSize: 15,
  color: 'red',
};
const toRTLTextStyles: TextStyle = {
  textAlign: 'right',
  paddingLeft: 12,
  margin: 9,
  alignSelf: 'flex-start',
  fontSize: 15,
  color: 'red',
};

describe('make text style tests', () => {
  it('should to makeTextStyle correctly', () => {
    expect(makeTextStyle(mockTextStyles, 'rtl')).toStrictEqual(toRTLTextStyles);
  });

  it('should to works correctly for array of styles', () => {
    expect(makeTextStyle([mockTextStyles, {}, []], 'rtl')).toStrictEqual(
      toRTLTextStyles,
    );
  });

  it('should ignore change styles in when direction ltr', () => {
    expect(makeTextStyle(mockTextStyles, 'ltr')).toMatchObject(mockTextStyles);
  });

  it('should accept undefined and null values', () => {
    const rtlStyles = makeTextStyle(
      {
        textAlign: undefined,
        fontSize: null,
        left: 15,
        alignItems: 'flex-start',
      },
      'rtl',
    );
    expect(rtlStyles).toStrictEqual({
      textAlign: undefined,
      fontSize: null,
      right: 15,
      alignItems: 'flex-end',
    });
  });
});
