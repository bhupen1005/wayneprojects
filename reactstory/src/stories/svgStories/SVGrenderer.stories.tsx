import React from "react";
import {
  CheckCircleSVGrenderer,
  AboutIconSVGrenderer,
} from "../../components/SVGRenderer";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof React.Component> = {
  title: "SVG Icons",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const AboutIconButton = {
  render: () => <AboutIconSVGrenderer />,
};
export const CheckCircleIcon = {
  render: () => <CheckCircleSVGrenderer />,
};
