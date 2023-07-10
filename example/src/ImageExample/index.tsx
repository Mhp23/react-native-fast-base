import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Container, Image, ImageSizes} from 'react-native-fast-base';

const IMAGE = 'https://www.stockvault.net/data/2011/05/31/124348/thumb16.jpg';

const Sizes: (keyof typeof ImageSizes)[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

const isCompression = true;

const ImagesCompression: React.FC = () => {
  return (
    <React.Fragment>
      {Sizes.map(size => {
        return (
          <Image key={size} size={size} radius={size} source={{uri: IMAGE}} />
        );
      })}
      <Image radius="full" source={{uri: IMAGE}} />
    </React.Fragment>
  );
};

const ImageExample: React.FC = () => {
  return (
    <Container py={10}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        {isCompression ? (
          <ImagesCompression />
        ) : (
          <Image size="sm" radius="full" source={{uri: IMAGE}} />
        )}
      </ScrollView>
    </Container>
  );
};

export default ImageExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 30,
    alignItems: 'center',
  },
});
