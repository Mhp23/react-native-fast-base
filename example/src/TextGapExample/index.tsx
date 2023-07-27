import React from 'react';
import {ScrollView} from 'react-native';
import {DefaultTextSizes, Text, Gap} from 'react-native-fast-base';

const values = Object.values(DefaultTextSizes);

const textStyle = (index: number) => ({
  backgroundColor: index % 2 === 1 ? 'gray' : 'green',
});

const TextGapExample: React.FC = () => {
  return (
    <ScrollView>
      <Gap space="xs">
        {values.slice(0, values.length / 2).map((size: any, index) => {
          return (
            <Text style={textStyle(index)} key={`${size}-${index}`} size={size}>
              Hello World
            </Text>
          );
        })}
      </Gap>
    </ScrollView>
  );
};

export default TextGapExample;
