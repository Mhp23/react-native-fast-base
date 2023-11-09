<p align="center">
  <img src="./assets/fast-base.jpg" alt="Fast Base Banner">
</p>

<p align="center">
  <strong>
    Easier & Faster Develop Your React Native (Expo) App (Android, iOS & Web) 
  </strong>
</p>

<div align="center">
  ⭐️ Highly customizable - Responsive UI - RTL Support - Dark/Light mode support ⭐️
</div>

<br />

<div align="center">
  <a href="/docs/USAGE.md">Documentation</a> · <a href="/example/src/">Examples</a>
</div>

<br />

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&color=07bc0c">
  </a>
  <a href="https://github.com/Mhp23/react-native-fast-base">
    <img src="https://img.shields.io/github/stars/Mhp23/react-native-fast-base?label=stars&logo&style=flat-square&color=800080">
  </a>
    <a href="https://twitter.com/HosseinPousti">
      <img src="https://img.shields.io/twitter/follow/rn_elements?style=flat-square&label=Twitter&logo=TWITTER&color=0089E3">
    </a>
</p>

## Introduction (v2)

React native fast base UI kit will help you to develop your apps faster with optimized and tested components.

Quick preview for RTL/LTR (English and Persian languages) and light/dark mode, featuring a fake tweet from Elon Musk about Fast Base! <a href="/example/src/TweetApp">Source here</a>
<br />

<p align="center">
  <img src="./assets/tweet.gif" alt="tweet app" width="40%">
</p>

## 💫 Features

- <strong>Cross-platform</strong>
- <strong>Easy to use</strong>

- <strong>Responsive UI</strong>

- <strong>Highly customizable</strong>

- <strong>Highly themeable</strong>

- <strong>Dark/Light mode support</strong>
- <strong>Attractive components</strong>

- <strong>RTL/LTR support as local and globally</strong>

- <strong>Written by Typescript, fully typed, and extendable</strong>

## 📀 Installation

**Yarn**:

```
yarn add @fast-base/native
```

**NPM**:

```
npm install @fast-base/native
```

Also, this package uses `react-native-safe-area-context` if you have already installed it and it was been added to your project dependencies you can skip this step, otherwise:

**Yarn**:

```
yarn add react-native-safe-area-context
```

**NPM**:

```
npm install react-native-safe-area-context
```

### <a target="blank" href="https://github.com/Mhp23/fast-base-icons">Do you need modern and customizable SVG-based icons?</a>

## 💅 Components

- [Wrapper](/docs/USAGE.md#wrapper)<br/>
- [Container](/docs/USAGE.md#container)<br/>
- [Text](/docs/USAGE.md#text)<br/>
- [Button](/docs/USAGE.md#button)
- [Input](/docs/USAGE.md#input)
- [Image](/docs/USAGE.md#image)
- [Divider](/docs/USAGE.md#divider)<br/>
- [Gap](/docs/USAGE.md#gap)<br/>
- [ProgressBar](/docs/USAGE.md#progressbar)<br/>

## 🚀 Quick Start

```tsx
import * as React from 'react';
import {Container, FastBaseProvider} from '@fast-base/native';

const theme = 'dark';

const MyAwesomeComponent: React.FC = () => {
  return (
    <Container p={10}>
      <Gap>
        <Button opacity type="primary" title="Opacity Button" />
        <Button pressable type="success" title="Pressable Button" />
      </Gap>
    </Container>
  );
};

export default function App() {
  return (
    <FastBaseProvider mode={theme}>
      <MyAwesomeComponent />
    </FastBaseProvider>
  );
}
```

Check out the [example directory](/example/src/) for more examples.

## 📚 Documentation

Check out the [usage documentation](/docs/USAGE.md) to learn how to use the components as basic and advanced usages to have high efficiency.

## ❤️ Support

`react-native-fast-base` as an open-source project is free and always will remain free, if you like this project and think is useful give 🌟 to it.

if you need any help: [business.mhpdev@gmail.com](mailto:business.mhpdev@gmail.com)

## 🤝 Contribution

Check out the [contributing guide](/docs/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
