import React from 'react';

import {Wrapper} from '@fast-base/native';

const WrapperExample: React.FC = () => {
  return (
    <Wrapper ax="center" ay="center" flex>
      <Wrapper width={20} height={5} mb={15} background="zinc-300" />
      <Wrapper px={25} py={30} background="green-200" />
    </Wrapper>
  );
};

export default WrapperExample;
