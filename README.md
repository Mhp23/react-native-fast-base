# React Native Fast Base
Easier and faster developing your React native apps

[![npm version](https://badge.fury.io/js/react-native-fast-base.svg)](https://www.npmjs.com/package/react-native-fast-base)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Installation

If you use **yarn**:
```
yarn add react-native-fast-base
```
Or by **npm**:
```
npm install react-native-fast-base
```
If your npm version is < 5 add *--save* to end of npm command

## What is this package?

It's the package help you faster developing your app. For example with added this package to your project you don't need to ***View*** anymore , you are able to use ***Wrapper***. With features that help you easier doing developing proces. (Wrapper extned by ViewProps). By the following  this instrucations , you capble of explore more informations about it!

## Components included:

[ThemeProvider](#theme-provider)<br/>
[Wrapper](#wrapper)<br/>
[Container](#container)<br/>
[Content](#content)<br/>
[Icon](#icon)<br/>
[Text](#text)<br/>
[Header](#header)<br/>
[Divider](#divider)<br/>
[Right](#right)<br/>
[Center](#center)<br/>
[Left](#left)<br/>
[Spacer](#spacer)<br/>
[Touchable](#touchable)

## Usage

### Theme Provider
This package provide ThemeProvider for handling light/dark mode your app , example in functional programming:

```js
import { ThemeProvider } from 'react-native-fast-base';

const App = ()=> {
  const isDarkMode = false;
  
  return (
    <ThemeProvider darkMode={isDarkMode}>
      {
        //...
      }
    </ThemeProvider>
  );
};
```

#### Default Theme
You are able to put *isDarkMode* on your state management , The default theme is:

```js
const Theme = {
  DefaultTheme: {
    darkmode: false,
    colors: {
      background: '#ECF0F1',
      secondText: '#626567',
      surface: '#E5E7E9',
      flat: '#F2F3F4',
      text: '#000000',
    },
  },
  DarkTheme: {
    darkmode: true,
    colors: {
      background: '#121212',
      secondText: '#B3B3B3',
      surface: '#181818',
      flat: '#282828',
      text: '#FFFFFF',
    },
  },
};
```
#### Custom Theme
##### React Hooks
Also you can define custom colors , button , text and etc and accessing that to anywhere , you only must set theme on the ThemeProvider and in another Components you are able to use that by **useTheme**:

```js
//...
import { 
  ThemeProvider,
  Theme
} from 'react-native-fast-base';

const MyCustomTheme: ThemeProps = {
  DefaultTheme: {
    ...Theme.DefaultTheme,
    colors: {
      ...Theme.DarkTheme.colors,
      //my colors
    },
    button: {
      //...
    },
    //...
  },
  DarkTheme: {
    ...Theme.DarkTheme,
    colors: {
      ...Theme.DarkTheme.colors,
      //my colors
    },
    button: {
      //...
    },
    //...
  }
}

const App = ()=> {
  const isDarkMode = true;
    
  return (
    <ThemeProvider theme={MyCustomTheme} darkMode={isDarkMode}>
      {
        //...
      }
    </ThemeProvider>
  );
};

export default App;
```
##### Class Component
If you are using class Component , for accessing theme as props , first you must connect **each** theme and Components by **withTheme**. if you haven't custom theme just pass your Component to that and in the another Components you are able to access to your the by **this.props.theme** , also if you have use functional Components beside class Components , you must set your custom theme in the ThemeProvider:

```js
//...
import { 
  ThemeProvider,
  Theme,
  withTheme
} from 'react-native-fast-base';

const MyCustomTheme: ThemeProps = {
  DefaultTheme: {
    ...Theme.DefaultTheme,
    colors: {
      ...Theme.DarkTheme.colors,
      //my colors
    },
    button: {
      //...
    },
    //...
  },
  DarkTheme: {
    ...Theme.DarkTheme,
    colors: {
      ...Theme.DarkTheme.colors,
      //my colors
    },
    button: {
      //...
    },
    //...
  }
}

class App extends React.Component {
  render() {
    const isDarkMode = true;
    
    return (
      <ThemeProvider darkMode={isDarkMode}>
        {
          //...
        }
      </ThemeProvider>
    );
  }
}

export default withTheme(App, MyCustomTheme);
```
By the default if the phone was be dark mode , your app theme will change to dark mode , if you don't want to this happened  it, add **ignorePhoneMode={true}** to the ThemeProvider.

### Wrapper
It's a flexible Component that with having common property can help you doing easeir create your Component and save your time!

|Name|Type|Discription|
|:---|:---|:---|
|flex|boolean|if it's be ```true``` will added ```flex:1``` , default is ```false```|
|mode|string|it's specifies the direction , by the default is ```normal``` and you can specifies direction one of the ```row , row-reverse , column , column-reverse```|
|alignX|string|```alignItems: string```|
|alignY|string|```justifyContent: string```|
|spaceY|number|```paddingVertical: number```|
|spaceX|number|```paddingHorizontal: number```|
|spaceEnd|number|```paddingEnd: number```|
|spaceStart|number|```paddingStart: number```|
|spaceTop|number|```paddingTop: number```|
|spaceBottom|number|```paddingBottom: number```|

And all **View** props.

```js
//...
import { Wrapper } from 'react-native-fast-base';
  //...
  <Wrapper>
    {
      //children
    }
  </Wrapper>
  //...
```

### Container
Container fill the screen and the background of that depends on your theme mode. It's was extended from Wrapper and have all props of that.

```js
//...
import { Container } from 'react-native-fast-base';
  //...
  <Container>
    {
      //children
    }
  </Container>
  //...
```

### Content
Content was extneded of [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view) , you can see the props of that on the page repo.

```js
//...
import { 
  Container,
  Content
} from 'react-native-fast-base';
  //...
  <Container>
    <Content>
      {
        //children
      }
    <Content/>
  </Container>
  //...
```
### Icon
Icon in react-native-fast-base it's very help to you to easier usage of the Icons , this packgae support all Icons in [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons). Also you don't need parent view or wrapper for that you can use from all **Wrapper** props for controlling that , for example:

```js
//...
import { Icon } from 'react-native-fast-base';
  //...
      <Icon
      alignX="center"
      alignY="center"
      name="user"
      type="AntDesign"
      size={2}/>
  //...
```
It should be noted all Icons and Text font Size are responsive by [react-native-responsive-dimensions](https://github.com/DaniAkash/react-native-responsive-dimensions). The number is not default react native font size , you can find more information about it on the page repo.

### Text

|Name|Type|Discription|
|:---|:---|:---|
|font|string|```fontFamily: string```|
|size|number|```fontSize: responsiveFontSize(number)``` , default is 1.5|
|color|string|color of text , default is ```colors.text``` in the your theme. Depends on the theme mode will change.|
|alignX|string|```textAlign: string```, default is ```auto```|
|lineHeight|number|lineHeight between lines|

And all react native **Text** props.

### Header
### Divider
### Right
### Center
### Left
### Spacer
### Touchable
