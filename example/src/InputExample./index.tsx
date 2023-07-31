import * as React from 'react';
import {Text, Input, Button, InputRef, useTheme} from '@fast-base/native';

const inputStyle = {marginBottom: 15};

const InputExample: React.FC = () => {
  const {colors} = useTheme();

  const ref = React.useRef<InputRef>(null);

  const Left = React.useCallback(
    () => (
      <Text color={colors?.secondText} size={13}>
        www.
      </Text>
    ),
    [colors?.secondText],
  );

  const Right = React.useCallback(
    () => (
      <Text color={colors?.secondText} size={13}>
        .com
      </Text>
    ),
    [colors?.secondText],
  );

  return (
    <React.Fragment>
      <Input.Underline
        ref={ref}
        animatable
        label="Label"
        containerStyle={inputStyle}
        placeholder="Write inline..."
        focusedBorderColor="purple-400"
      />
      <Input.Outline
        // invalid
        label="Username"
        containerStyle={inputStyle}
        placeholder="Write inline..."
        invalidLabel="Username pattern is invalid"
        hintLabel="Username should be only characters"
      />
      <Input.Outline
        radius="lg"
        leftElement={Left}
        rightElement={Right}
        placeholder="Enter website"
        containerStyle={inputStyle}
      />
      <Input.Outline
        size="lg"
        multiline
        radius="full"
        containerStyle={inputStyle}
        placeholder="Enter multiline..."
      />
      <Button pressable size="sm" onPress={() => ref.current?.shake()}>
        Shake!
      </Button>
      <Button pressable size="sm" onPress={() => ref.current?.bounce()}>
        Bounce!
      </Button>
      <Button pressable size="sm" onPress={() => ref.current?.focus()}>
        Focus!
      </Button>
      <Button pressable size="sm" onPress={() => ref.current?.blur()}>
        Blur!
      </Button>
      <Button pressable size="sm" onPress={() => ref.current?.clear()}>
        Clear!
      </Button>
      <Text color={colors?.secondText} ax="justify" size={13}>
        The above action buttons were been referenced to the first text input.{' '}
      </Text>
    </React.Fragment>
  );
};

export default InputExample;
