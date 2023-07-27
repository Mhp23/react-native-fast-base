import React from 'react';
import {Button, Wrapper, Container} from '@fast-base/native';

const ButtonExample: React.FC = () => {
  return (
    <Container>
      <Wrapper flex alignY="space-evenly" alignX="center">
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
          title="Pressable Outiline Button"
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
      </Wrapper>
    </Container>
  );
};
export default ButtonExample;
