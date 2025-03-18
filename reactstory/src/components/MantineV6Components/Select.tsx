import React from 'react';
import { Select as MantineSelect, SelectProps } from '@mantine/core';

const Select: React.FC<SelectProps> = (props) => {
  return <MantineSelect {...props} />;
};

export default Select;
