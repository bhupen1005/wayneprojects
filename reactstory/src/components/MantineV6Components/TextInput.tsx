import React from 'react';
import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core';

const TextInput: React.FC<TextInputProps> = (props) => {
  return <MantineTextInput {...props} />;
};

export default TextInput;
