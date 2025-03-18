import { Accordion } from "../Common";

export interface AccordionItem {
  value: string;
  control: React.ReactNode;
  panel: React.ReactNode;
}

export interface AddClaimAccordianProps {
  items: AccordionItem[];
}

export const AddClaimAccordian = ({ items }: AddClaimAccordianProps) => {
  return (
    <Accordion
      m={50}
      transitionDuration={600}
      styles={{
        item: {
          padding: "10px 0",
          borderBottom: "1px solid #fff",
        },
        control: {
          padding: "10px 0",
          border: "none",
        },
        panel: {
          border: "none",
        },
      }}
    >
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Control>{item.control}</Accordion.Control>
          <Accordion.Panel>{item.panel}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
