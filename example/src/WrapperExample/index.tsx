import React from 'react';

import {Wrapper} from '@fast-base/native';

const WrapperExample: React.FC = () => {
  return (
    <Wrapper ax="flex-start" px={10} ay="center" flex>
      <Wrapper width={20} height={5} mb={15} background="zinc-300" />
      <Wrapper width={40} px={25} py={30} background="green-200" />

      <Wrapper mt={15} mode="row">
        <Wrapper height={5} background="blue-300" flex />
        <Wrapper height={5} background="red-300" flex />
      </Wrapper>
    </Wrapper>
  );
};

export default WrapperExample;
