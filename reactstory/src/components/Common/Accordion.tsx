import React from "react";
import {
  Accordion as AccordionComponent,
  AccordionProps,
  AccordionItemProps,
  AccordionControlProps,
  AccordionPanelProps,
} from "@mantine/core";

interface AccordionStoryProps extends AccordionProps {
  children: React.ReactNode;
}

interface AccordionItemStoryProps extends AccordionItemProps {
  children: React.ReactNode;
}

interface AccordionControlStoryProps extends AccordionControlProps {
  children: React.ReactNode;
}

interface AccordionPanelStoryProps extends AccordionPanelProps {
  children: React.ReactNode;
}

const Item = ({ children, ...props }: AccordionItemStoryProps) => {
  return (
    <AccordionComponent.Item {...props}>{children}</AccordionComponent.Item>
  );
};

const Control = ({ children, ...props }: AccordionControlStoryProps) => {
  return (
    <AccordionComponent.Control {...props}>
      {children}
    </AccordionComponent.Control>
  );
};

const Panel = ({ children, ...props }: AccordionPanelStoryProps) => {
  return (
    <AccordionComponent.Panel {...props}>{children}</AccordionComponent.Panel>
  );
};

export const Accordion = ({ children, ...props }: AccordionStoryProps) => {
  return <AccordionComponent {...props}>{children}</AccordionComponent>;
};

Accordion.Item = Item;
Accordion.Control = Control;
Accordion.Panel = Panel;
