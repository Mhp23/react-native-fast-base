import React from 'react';
import Wrapper from './Wrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import {useTheme} from '../hooks';
import {IconProps} from '../core/types';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';

const defaultProps: IconProps = {
  name: '',
  type: 'MaterMaterialCommunityIcons',
  size: 2.5,
};

const Icon: React.FC<IconProps> = ({
  onPress,
  type,
  name,
  size,
  color,
  ...rest
}) => {
  const {colors} = useTheme();

  const IconComponent = React.useMemo(() => {
    switch (type) {
      case 'Entypo':
        return Entypo;
      case 'AntDesign':
        return AntDesign;
      case 'Feather':
        return Feather;
      case 'MaterialIcons':
        return MaterialIcon;
      case 'Fontisto':
        return Fontisto;
      case 'Ionicons':
        return Ionicon;
      case 'SimpleLineIcons':
        return SimpleLineIcons;
      case 'FontAwesome':
        return FontAwesomeIcon;
      case 'Octicons':
        return Octicons;
      case 'FontAwesome5':
        return FontAwesome5Icon;
      case 'FontAwesome5Pro':
        return FontAwesome5ProIcon;
      case 'Zocial':
        return Zocial;
      default:
        return MaterialCommunityIcons;
    }
  }, [type]);

  return onPress ? (
    <Wrapper {...rest}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <IconComponent
          name={name}
          size={responsiveFontSize(size)}
          color={color || colors?.secondText}
        />
      </TouchableOpacity>
    </Wrapper>
  ) : (
    <Wrapper {...rest}>
      <IconComponent
        name={name}
        size={responsiveFontSize(size)}
        color={color || colors?.secondText}
      />
    </Wrapper>
  );
};

Icon.defaultProps = defaultProps;

export default Icon;
