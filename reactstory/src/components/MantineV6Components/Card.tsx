import React from 'react';
import { Card as MantineCard, CardProps } from '@mantine/core';

const Card: React.FC<CardProps> = (props) => {
  return <MantineCard {...props} />;
};

export default Card;
