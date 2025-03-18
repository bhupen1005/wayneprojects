module.exports = {
  framework: "@storybook/react-vite",
  stories: ["../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "storybook-addon-mantine",
    // "storybook-addon-responsive-views",
  ],
  core: {
    disableTelemetry: true, // Optional, but helps with some Vite errors
  },
};
