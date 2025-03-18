import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

type ButtonProps = MUIButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  return <MUIButton {...props} />;
};

export default Button;
