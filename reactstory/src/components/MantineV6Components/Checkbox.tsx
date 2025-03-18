import React from 'react';
import { Checkbox as MantineCheckbox, CheckboxProps } from '@mantine/core';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MantineCheckbox {...props} />;
};

export default Checkbox;
