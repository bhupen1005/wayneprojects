import React from 'react';
import { Modal as MantineModal, ModalProps } from '@mantine/core';

const Modal: React.FC<ModalProps> = (props) => {
  return <MantineModal {...props} />;
};

export default Modal;
