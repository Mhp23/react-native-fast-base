import React from 'react';
import {Button, Wrapper, Container, Text, Gap} from '@fast-base/native';

const ButtonExample: React.FC = () => {
  return (
    <Container dir="ltr">
      <Wrapper flex ay="space-evenly" ax="center">
        <Button title="Normal Button" />
        <Button
          pressable
          type="primary"
          color="cyan-500"
          title="Pressable Button"
        />
        <Button opacity type="warning" title="Opacity Button" />
        <Button
          pressable
          type="success"
          mode="outline"
          title="Pressable Outline Button"
        />
        <Button
          shadow
          size="sm"
          pressable
          type="error"
          title="Pressable Shadow Button (small)"
        />
        <Button
          opacity
          pressable
          radius="md"
          type="secondary"
          title="Pressable & Opacity Button"
        />
        <Button pressable color="gray-600">
          <Gap space={10} behavior="style">
            <Text color="gray-100" size="lg">
              It's a title!
            </Text>
            <Text color="gray-200" size="md">
              It's a subtitle!
            </Text>
            <Text color="gray-300" size="sm">
              It's a description!
            </Text>
          </Gap>
        </Button>
      </Wrapper>
    </Container>
  );
};
export default ButtonExample;
