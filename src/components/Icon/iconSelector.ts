import {IconPropsType} from '../../core';
import Zocial from 'react-native-vector-icons/Zocial';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSelector = (type?: IconPropsType) => {
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
};

export default iconSelector;
