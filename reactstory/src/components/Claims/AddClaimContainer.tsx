import { CustomerDetailsContainer } from "@/stories/CustomerDetailsContainer.stories";
import {
  CustomerLineSVGrenderer,
  EuroLineSVGrenderer,
  QuestionLineSVGrenderer,
  TicketLineSVGrenderer,
  TrainLineSVGrenderer,
} from "../SVGRenderer";
import { AccordianHeading } from "./AccordianHeading";
import { AddClaimAccordian } from "./AddClaimAccordian";

export const AddClaimContainer = () => {
  const accordionItems = [
    {
      value: "customerDetails",
      control: (
        <AccordianHeading
          completed={true}
          title="Customer Details"
          headingIcon={<CustomerLineSVGrenderer />}
        />
      ),
      panel: <CustomerDetailsContainer.render />,
    },
    {
      value: "journeyDetails",
      control: (
        <AccordianHeading
          completed={false}
          title="Journey Details"
          headingIcon={<TrainLineSVGrenderer />}
        />
      ),
      panel: <div>Order details content goes here.</div>,
    },
    {
      value: "ticketDetails",
      control: (
        <AccordianHeading
          completed={false}
          title="Ticket Details"
          headingIcon={<TicketLineSVGrenderer />}
        />
      ),
      panel: <div>Payment details content goes here.</div>,
    },
    {
      value: "furtherClaimDetails",
      control: (
        <AccordianHeading
          completed={false}
          title="Further Claim Details"
          headingIcon={<QuestionLineSVGrenderer />}
        />
      ),
      panel: <div>Payment details content goes here.</div>,
    },
    {
      value: "compensation&payment",
      control: (
        <AccordianHeading
          completed={false}
          title="Compensation & Payment"
          headingIcon={<EuroLineSVGrenderer />}
        />
      ),
      panel: <div>Payment details content goes here.</div>,
    },
  ];
  return (
    <div>
      <AddClaimAccordian items={accordionItems} />
    </div>
  );
};
