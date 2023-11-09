import React from 'react';
import {
  Button,
  Container,
  Divider,
  Gap,
  Image,
  Text,
  Wrapper,
  useTheme,
} from '@fast-base/native';
import {setStatusBarStyle} from 'expo-status-bar';

const generateMockTweet = (lang: 'fa' | 'en') => {
  return {
    username: 'elonmusk',
    name: 'Elon Musk',
    avatarSource: require('./elon-musk.jpg'),
    tweet:
      lang === 'en'
        ? 'Boost your software development with lightning-fast speed using @fast-base/native kit. This package allows you to effortlessly leverage advanced programming capabilities and enhance your applications!'
        : 'با استفاده از بسته @fast-base/native، توسعه‌ی نرم‌افزارهای خود را با سرعت بیشتری انجام دهید. این بسته به شما امکان می‌دهد تا به راحتی از قابلیت‌های پیشرفته‌ی برنامه‌نویسی بهره‌برده و اپلیکیشن‌های خود را بهبود بخشید!',
  };
};

const Card: React.FC<ReturnType<typeof generateMockTweet>> = ({
  name,
  username,
  avatarSource,
  tweet,
}) => {
  const {colors} = useTheme();
  return (
    <Wrapper mode="row" px={10} pt={5} pb={10}>
      <Wrapper ay="flex-start">
        <Image
          width={40}
          height={40}
          radius="full"
          skeletonLoading
          source={avatarSource}
        />
      </Wrapper>
      <Wrapper px={10} flex>
        <Wrapper mb={5} mode="row">
          <Gap behavior="style" space={5} mode="H">
            <Text weight="600">{name}</Text>
            <Text color={colors.secondText}>@{username}</Text>
          </Gap>
        </Wrapper>
        <Text ax="left" height={26} size={13}>
          {tweet}
        </Text>
      </Wrapper>
    </Wrapper>
  );
};

const TweetApp: React.FC = () => {
  const {dir, mode, changeDir, changeMode} = useTheme();

  const [data, setData] = React.useState<ReturnType<typeof generateMockTweet>>(
    generateMockTweet('en'),
  );

  const onToggleTheme = React.useCallback(() => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    changeMode(newMode, () => {
      setStatusBarStyle(newMode === 'dark' ? 'light' : 'dark');
    });
  }, [changeMode, mode]);

  const onToggleDir = React.useCallback(() => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    if (newDir === 'ltr') {
      setData(generateMockTweet('en'));
    } else {
      setData(generateMockTweet('fa'));
    }
    changeDir(newDir);
  }, [changeDir, dir]);

  return (
    <Container>
      <Card {...data} />
      <Divider />
      <Wrapper px={20} py={20}>
        <Gap behavior="style" space="lg">
          <Button
            onPress={onToggleTheme}
            title="Toggle Theme"
            type="primary"
            pressable
            size="sm"
          />
          <Button
            onPress={onToggleDir}
            title="Toggle Direction"
            type="secondary"
            pressable
            size="sm"
          />
        </Gap>
      </Wrapper>
    </Container>
  );
};

export default TweetApp;
