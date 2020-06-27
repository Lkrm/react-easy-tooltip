import React from 'react';
import { useTooltip } from './useTooltip';

export const withTooltip = (params) => (Component) => () =>  <Component {...useTooltip(params)} />;
