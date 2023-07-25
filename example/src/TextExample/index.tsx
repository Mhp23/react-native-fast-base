import React from 'react';
import {DefaultTextSizes, Text, Wrapper} from 'react-native-fast-base';

const values = Object.values(DefaultTextSizes);

const TextExample: React.FC = () => {
  return (
    <Wrapper p={10} flex>
      {values.slice(0, values.length / 2).map((size: any, index) => {
        return (
          <Text key={`${size}-${index}`} size={size}>
            Hello World
          </Text>
        );
      })}
    </Wrapper>
  );
};

export default TextExample;
