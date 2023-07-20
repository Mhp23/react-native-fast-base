import {RenderNodeType} from '../core';

export const renderNode = (node?: RenderNodeType) => {
  return typeof node === 'function' ? node() : node;
};
