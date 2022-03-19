import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleProp,
  FlexAlignType,
  ViewStyle,
  ViewProps,
  TextProps as NativeTextProps,
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
} from 'react-native';

export type ColorsPropsType = {
  background?: string;
  secondText?: string;
  surface?: string;
  flat?: string;
  text?: string;
};
export type IconPropsType =
  | 'AntDesign'
  | 'Entypo'
  | 'MaterialIcons'
  | 'MaterMaterialCommunityIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'Ionicons'
  | 'Fontisto'
  | 'Feather'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
export type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type FlexAlignYType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type WrapperModePropType =
  | 'normal'
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export type SpacerPropsType = 'custom' | 'space';

export type DividerPropsType = 'border' | 'padding';

export interface ThemeHOCProps {
  theme: ThemeContentProps;
}
export interface ThemeContentProps {
  colors?: ColorsPropsType;
  darkmode?: boolean;
  [key: string]: any;
}
export interface ThemeProps {
  DefaultTheme?: ThemeContentProps;
  DarkTheme?: ThemeContentProps;
}
export interface ProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
  darkMode?: boolean;
  /**
   * On the default if your phone dark mode was enabled , the theme will change to dark mode.
   * you are able to pass true to ignore Phone Mode and theme mode will handled manually
   * @default false
   * @type {boolean}
   */
  ignorePhoneMode?: boolean;
}
export interface WrapperProps extends ViewProps {
  /**
   * Wrapper mode is property same of flexDirection
   * @type {WrapperModePropType}
   */
  mode?: WrapperModePropType;
  alignY?: FlexAlignYType;
  alignX?: FlexAlignType;
  spaceTop?: number;
  spaceBottom?: number;
  spaceStart?: number;
  spaceEnd?: number;
  spaceY?: number;
  spaceX?: number;
  flex?: boolean;
}
export interface IconProps extends WrapperProps {
  /**
   * Icons collections names depends on the Icon type , that is supported in <https://github.com/oblador/react-native-vector-icons>
   * @type {string}
   */
  name: string;
  /**
   * @type {number}
   */
  size: number;
  color?: string;
  /**
   * Icons collections types , that is supported in <https://github.com/oblador/react-native-vector-icons>
   * @type {IconPropsType}
   */
  type?: IconPropsType;
  onPress?: (event: GestureResponderEvent) => void;
}
export interface HeaderProps extends WrapperProps {
  height?: number;
  transparent?: boolean;
}
export interface ContentProps extends KeyboardAwareScrollViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
export interface TextProps extends NativeTextProps {
  /**
   * It's font size number that use from <https://github.com/react-native-toolkit/react-native-responsive-dimensions> for responsive font size,
   * every tenth decimal affects that.
   * @default 1.5
   * @type {number}
   */
  size?: number;
  color?: string;
  /**
   * Line height between multilines in text
   * @type {number}
   */
  lineHeight?: number;
  /**
   * Font family of Text
   * @type {string}
   */
  font?: string;
  alignX?: TextAlignType;
  onPress?: (event: GestureResponderEvent) => void;
}
export interface TouchableProps extends TouchableWithoutFeedbackProps {
  underlayColor?: string;
  rippleColor?: string;
  borderLess?: boolean;
  /**
   * The flag to allowing background in TouchableNativeFeedback
   * @platform android
   */
  hasBackground?: boolean;
}
export interface SpacerProps {
  size?: number;
  color?: string;
  spaceY?: number;
  spaceX?: number;
  /**
   * It's Spacer mode behavior
   * @default space
   * @type {SpacerPropsType}
   */
  mode?: SpacerPropsType;
  /**
   * In the custom mode you are able to set custom symbol between elements
   * @default .
   * @type {string}
   */
  customSymbol?: string;
}
export interface DividerProps {
  /**
   * Vertical divider between two elements
   * @default border
   * @type {DividerPropsType}
   */
  mode?: DividerPropsType;
  spaceY?: number;
  spaceTop?: number;
  spaceBottom?: number;
  /**
   * Border width size
   * @type {number}
   */
  width?: number;
  style?: StyleProp<ViewStyle>;
}
