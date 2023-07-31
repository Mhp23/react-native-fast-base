import React from 'react';
import {Wrapper, Container, ProgressBar} from '@fast-base/native';

const ProgressExample: React.FC = () => {
  const countInterval = React.useRef(null);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (count >= 100) {
      clearInterval(countInterval.current);
    }
  }, [count]);

  React.useEffect(() => {
    countInterval.current = setInterval(() => {
      setCount(current => {
        const random = Math.random() * 10;
        return current + random > 100 ? 100 : current + random;
      });
    }, 1000);
    return () => {
      clearInterval(countInterval.current);
    };
  }, []);

  return (
    <Container p={10}>
      <Wrapper flex ay="center" ax="center">
        <ProgressBar
          width={300}
          value={count}
          useNativeDriver={false}
          progressColor="green-500"
        />
      </Wrapper>
    </Container>
  );
};

export default ProgressExample;
