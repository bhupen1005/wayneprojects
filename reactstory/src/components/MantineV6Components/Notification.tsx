import React from 'react';
import { Notification as MantineNotification, NotificationProps } from '@mantine/core';

const Notification: React.FC<NotificationProps> = (props) => {
  return <MantineNotification {...props} />;
};

export default Notification;
