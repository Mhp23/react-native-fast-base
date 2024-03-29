import {ReactNode} from 'react';
import Colors from '../default/colors';
import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  TextStyle,
  ImageProps,
  FlexAlignType,
  PressableProps,
  ColorSchemeName,
  ActivityIndicatorProps,
  TextProps as NativeTextProps,
  TextInput,
  TextInputProps,
} from 'react-native';
import {Animated} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';

export enum DefaultSizes {
  xs = 8,
  sm = 10,
  md = 12,
  lg = 14,
  xl = 18,
}
export enum DefaultTextSizes {
  xs = 12,
  sm = 14,
  md = 16,
  lg = 18,
  xl = 20,
  '2xl' = 24,
  '3xl' = 28,
  '4xl' = 32,
  '5xl' = 36,
  '6xl' = 40,
  '7xl' = 44,
  '8xl' = 48,
  '9xl' = 52,
  '10xl' = 60,
}
export enum ImageSizes {
  xs = 10,
  sm = 12,
  md = 16,
  lg = 20,
  xl = 26,
  '2xl' = 30,
}
export enum InputSpaceSizes {
  xs = 11,
  sm = 12,
  md = 13,
  lg = 14,
  xl = 15,
}
export type DirectionType = 'ltr' | 'rtl';
export type SOmit<S extends string> = S | Omit<string, S>;
export type SNOmit<S extends string | number> = S | Omit<string | number, S>;
export type AllColorsType =
  SOmit<`${keyof typeof Colors}-${keyof ColorsProps}`>;
export type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode | undefined;
};
export type PropsWithLayout<P = unknown> = P & {
  dir?: DirectionType;
};
export type RenderNodeType = React.ReactNode | (() => React.ReactNode);
export type MappedType = {
  [key: string]: any;
};
export type AspectRatioType =
  | '16/9'
  | '4/3'
  | '1/1'
  | '2/3'
  | '9/16'
  | '3/2'
  | '5/3';
export type SizeType = keyof typeof DefaultSizes;
export type PrimaryColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';
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
export interface ColorsProps {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
export type DefaultThemeColorsProps = Partial<
  {
    [key in PrimaryColorType]: string;
  } & {
    flat: string;
    text: string;
    border: string;
    surface: string;
    disabled: string;
    secondText: string;
    background: string;
  }
>;
export interface DefaultThemeContentProps {
  dir?: DirectionType;
  mode?: ColorSchemeName;
  defaultColors?: typeof Colors;
}
export type ThemeColorsProps<T extends MappedType = {}> =
  DefaultThemeColorsProps & {
    [P in keyof T]: T[P];
  };
export type ThemeContentProps<T extends MappedType = {}> =
  DefaultThemeContentProps & {
    colors?: ThemeColorsProps<T['colors']>;
  } & {
    [P in keyof T]: T[P];
  };
export interface ThemeProps<T extends MappedType = {}> {
  DarkTheme?: ThemeContentProps<T>;
  DefaultTheme?: ThemeContentProps<T>;
}
export type ThemeContextProps<T extends MappedType = {}> =
  ThemeContentProps<T> & {
    changeMode: (
      mode: ColorSchemeName,
      /**
       * you can execute your callback function after the theme mode is changed, such as
       * changing the Android navigation bar color, status bar color, etc.
       */
      changeModeCallback?: (newMode: ColorSchemeName) => void | Promise<void>,
    ) => void;
    changeDir: (
      dir: DirectionType,
      /**
       * you can execute a callback function after the theme layout direction is changed.
       */
      changeDirCallback?: (newDir: DirectionType) => void | Promise<void>,
    ) => void;
  };

export type ThemeProviderProps<T extends MappedType = {}> = Pick<
  DefaultThemeContentProps,
  'mode' | 'dir'
> & {
  theme?: ThemeProps<T>;
  /**
   * at default, if your phone's dark mode is enabled, the theme will change to dark mode.
   * You are able to set this property as false to avoid enabling system mode and the theme
   * will be handled manually.
   * @default true
   */
  enableSystemMode?: boolean;
};

export interface SpaceXYProps extends ViewProps, PropsWithChildren {
  /**
   * p is equal to padding style
   */
  p?: number;
  /**
   * px is equal to paddingHorizontal style
   */
  px?: number;
  /**
   * py is equal to paddingVertical style
   */
  py?: number;
  /**
   * pt is equal to paddingTop style
   */
  pt?: number;
  /**
   * pb is equal to paddingBottom style
   */
  pb?: number;
  /**
   * pr is equal to paddingRight style
   */
  pr?: number;
  /**
   * pl is equal to paddingLeft style
   */
  pl?: number;
  /**
   * pe is equal to paddingEnd style
   */
  pe?: number;
  /**
   * ps is equal to paddingStart style
   */
  ps?: number;
  /**
   * m is equal to margin style
   */
  m?: number;
  /**
   * mx is equal to marginHorizontal style
   */
  mx?: number;
  /**
   * my is equal to marginVertical style
   */
  my?: number;
  /**
   * mt is equal to marginTom style
   */
  mt?: number;

  /**
   * mb is equal to marginBottom style
   */
  mb?: number;
  /**
   * mr is equal to marginRight style
   */
  mr?: number;
  /**
   * ml is equal to marginLeft style
   */
  ml?: number;
  /**
   * me is equal to marginEnd style
   */
  me?: number;
  /**
   * ms is equal to marginStart style
   */
  ms?: number;
}
export interface WrapperProps extends SpaceXYProps {
  /**
   * the responsive width size using passed width percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  width?: number;
  /**
   * the responsive height size using passed height percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  height?: number;

  ax?: FlexAlignType;

  ay?: FlexAlignYType;

  self?: 'auto' | FlexAlignType;
  /**
   * this is a property to specify component flex direction
   */
  mode?: WrapperModePropType;
  /**
   * you are able to set a boolean or number value for this property,
   * if the value of the flex property is 'true', flex will consider '1',
   * and if you pass a number, a numeric value will be considered for
   * the flex value.
   */
  flex?: number | boolean;

  background?: AllColorsType;
}
export type ContainerProps = PropsWithChildren<
  SafeAreaViewProps & Pick<WrapperProps, 'background'> & SpaceXYProps
>;
export interface TextProps<T extends string = ''> extends NativeTextProps {
  ax?: TextAlignType;
  /**
   * font size of the component th
   * @default md
   */
  size?: keyof typeof DefaultTextSizes | number;
  /**
   * text color of the component, you are able to set a custom text color for
   * the text (as default the text color provided in the theme will consider)
   */
  color?: AllColorsType;
  /**
   * to specify the component font family, you are capable of using your type
   * as generic in the text component.
   */
  font?: T;
  /**
   * line height of the component
   */
  height?: number;
  /**
   * font weight of the component
   */
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}
export interface DividerProps extends ViewProps {
  /**
   * the direction of dividing two elements
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * dividing mode of two elements
   * @default border
   */
  mode?: 'padding' | 'border';
  /**
   * the border width of the divider, in the padding, will be considered as space
   * @default 1
   */
  width?: number;
  /**
   * border color of the component, you are able to set a custom border color for
   * the Divider component (as default flat color provided in the theme will consider),
   * only works when the mode is `border`
   */
  color?: AllColorsType;

  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps extends PressableProps {
  children: string | ReactNode;
  /**
   * to specify the component type. As default, if the button has title or
   * string children the property will be "primary"
   */
  type: PrimaryColorType;
  /**
   * button style mode could one of this modes.
   */
  mode: 'solid' | 'outline' | 'transparent';
  /**
   * button size, if the child of the button is text or that has the title,
   * the default type will be "md"
   */
  size: SizeType;
  /**
   * enabling activity indicator
   */
  loading: boolean;

  loadingColor: AllColorsType;
  /**
   * all available properties in ActivityIndicator component
   */
  loadingProps: ActivityIndicatorProps;

  title: string;
  /**
   * button color
   */
  color: AllColorsType;

  titleStyle: StyleProp<TextStyle>;

  titleColor: AllColorsType;

  titleProps: Omit<TextProps, 'style'>;
  /**
   * if the children of the button are not a string or it doesn't have a title,
   * the default radius value will be zero.
   */
  radius: SizeType | number;
  /**
   * only works on solid mode
   */
  shadow: 'low' | 'medium' | 'high' | boolean;

  disabledButtonColor: AllColorsType;

  disabledTitleColor: AllColorsType;

  disabledTitleStyle: StyleProp<TextStyle>;

  borderColor: AllColorsType;

  pressable: boolean;
  /**
   * to specify the button `pressIn` and `pressOut` custom animation config.
   */
  pressableConfig: UseAnimationConfig;
  /**
   * to specify does the button component is an opacity or not, if the property is
   * "true", the default opacity value will be "0.5".
   */
  opacity: number | boolean;
  /**
   * to specify the button opacity `pressIn` custom animation config.
   */
  opacityConfig: Pick<UseAnimationConfig, 'pressIn'>;
}
export interface UseAnimationConfig {
  pressIn?: Partial<Animated.TimingAnimationConfig>;
  pressOut?: Partial<Animated.TimingAnimationConfig>;
}
export interface FastBaseImageProps extends ImageProps {
  /**
   * with using width or height, the size property will useless
   */
  width?: number;
  /**
   * with using width or height, the size property will useless

   */
  height?: number;
  /**
   * should to use only one of the size property or width and height properties
   * @default md
   */
  size?: keyof typeof ImageSizes;

  radius?: keyof typeof ImageSizes | 'full' | number;
  /**
   * to disable default React Native image caching, it works only when you use URI
   * to specify the image source
   */
  noCache?: boolean;
  /**
   * image aspect ratio, could be string or number like:
   * "1/1"
   *  1/1
   *  1
   *  16/9
   */
  aspectRatio?: SNOmit<AspectRatioType>;
  /**
   * showing skeleton loading when image is loading
   * @default false
   */
  skeletonLoading?: boolean;

  loadingColor?: AllColorsType;
}

type EndResult = {finished: boolean};
type EndCallback = (result: EndResult) => void;
export interface CompositeAnimation {
  /**
   * Animations are started by calling start() on your animation.
   * start() takes a completion callback that will be called when the
   * animation is done or when the animation is done because stop() was
   * called on it before it could finish.
   *
   * @param callback - Optional function that will be called
   *      after the animation finished running normally or when the animation
   *      is done because stop() was called on it before it could finish
   *
   * @example
   *   Animated.timing({}).start(({ finished }) => {
   *    // completion callback
   *   });
   */
  start: (callback?: EndCallback) => void;
  /**
   * Stops any running animation.
   */
  stop: () => void;
  /**
   * Stops any running animation and resets the value to its original.
   */
  reset: () => void;
}
export interface ProgressProps {
  /**
   * using native driver or JS bridge
   * @default true
   */
  useNativeDriver?: boolean;
  /**
   * width of progress bar
   */
  width: number;
  /**
   * height of progress bar
   * @default md
   */
  height?: SizeType | number;
  /**
   * the progress bar value, should be between 0 to 100
   */
  value: number;
  /**
   * progress bar container background color
   * @default flat
   */
  background?: AllColorsType;
  /**
   * progress bar color
   * @default primary
   */
  progressColor?: AllColorsType;
  /**
   * progress bar container style
   */
  style?: StyleProp<ViewStyle>;
}
export interface InputRef
  extends Pick<
    TextInput,
    'clear' | 'blur' | 'focus' | 'isFocused' | 'setNativeProps'
  > {
  /**
   * to shake animate text input (e.g. when invalid data in input is submitted)
   * @param duration
   */
  shake: (duration?: number) => void;
  /**
   * to bounce animate text input (e.g. when invalid data in input is submitted)
   * @param duration
   */
  bounce: (duration?: number) => void;
}

export interface InputProps extends TextInputProps {
  /**
   * to disable text input completely and change style to disabled mode
   */
  disabled?: boolean;
  /**
   * with the property, text input is no longer editable and is just readable
   */
  readonly?: boolean;
  /**
   * with the property, the text input style will change to invalid mode
   */
  invalid?: boolean;
  /**
   * to specify that the text input content is a password
   */
  passowrd?: boolean;
  /**
   * the text input size
   * @default md
   */
  size?: keyof typeof InputSpaceSizes;
  /**
   * text input background, only works when the mode property is "fill"
   */
  background?: AllColorsType;
  /**
   * to specify that the animations use native driver or not
   * @default true
   */
  useNativeDriver?: boolean;

  inputStyle?: StyleProp<TextStyle>;

  label?: string | RenderNodeType;

  labelStyle?: StyleProp<TextStyle>;
  /**
   * only works when the invalid property is enabled
   */
  invalidLabel?: string | RenderNodeType;

  invalidLabelStyle?: StyleProp<TextStyle>;
  /**
   * to specify in particular hints to the user such as about
   * what the text input content should be
   */
  hintLabel?: string | RenderNodeType;

  hintLabelStyle?: StyleProp<TextStyle>;

  leftElement?: RenderNodeType;

  rightElement?: RenderNodeType;
  /**
   * it only works when the component has the left element
   */
  leftParentProps?: WrapperProps;
  /**
   * It only works when the component has the right element
   */
  rightParentProps?: WrapperProps;
  /**
   * only works when the invalid property is enabled and the text input is unfocused
   */
  invalidStyle?: StyleProp<ViewStyle>;

  borderWidth?: number;

  unFocusedBorderColor?: AllColorsType;

  focusedBorderColor?: AllColorsType;
  /**
   * parent container of the text input, recommend using for custom styles like padding or margin
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export interface UnderlineInputProps extends InputProps {
  /**
   * in order to show/hide the border animatedly when focused and on blurred
   * @default true
   */
  animatable?: boolean;
  /**
   * the border scale animation duration when input focused, only works when the animatable
   * property is enabled
   * @default 250ms
   */
  focusDuration?: number;
  /**
   * the border scale animation duration when input is blurred, only works when the animatable
   * property is enabled
   * @default 200ms
   */
  blurDuration?: number;
}
export interface OutlineInputProps extends InputProps {
  /**
   * border radius around of the text input
   * @default xs
   */
  radius?: SizeType | 'full' | number;
}
export interface GapProps {
  /**
   * the direction of applying space gap, "H" means horizontal, and "V" means vertical
   * @default V
   */
  mode?: 'H' | 'V';
  /**
   * the space value between each items
   * @default xs
   */
  space?: SizeType | number;
  /**
   * to reverse children's items priority
   * @default false
   */
  reversed?: boolean;
  /**
   *  the behavior could be style or element:
   * - style: will add margin style to your element based on the current mode (Please consider style only add to element
   * if the children elements could accept style, such as View, Text, Image, etc.)
   * - divider: will add a divider component between your children's elements based on the current mode
   * @default divider
   */
  behavior?: 'style' | 'divider';
  /**
   * only works when the behavior is "divider"
   */
  dividerProps?: DividerProps;
}
