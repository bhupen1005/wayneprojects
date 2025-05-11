import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state";
import Main from "./Components/SideBar/Main";
import MessageScreen from "./Components/MessageScreen/MessageScreen";
import { stringify } from "querystring";
import { ToastProvider } from "./Components/ReUsableComponent/Toast/ToastContext";
import MainCharts from "./Components/MessageScreen/LandingPageChart/MainCharts";
import DynamicChart from "./Components/MessageScreen/LandingPageChart/DynamicChart";

jest.setTimeout(60000); // 30 seconds
test("renders login screen", async () => {
  render(
    <Provider store={store}>
      <App>
        <Main />
      </App>
    </Provider>
  );
  await screen.findByText((content, element) => content.includes("Welcome to Ventoux"));
  await screen.findByText((content, element) => content.includes("Login"));

  // click on the login button
  const loginButton = await screen.findByText((content, element) => content.includes("Login"));
  await userEvent.click(loginButton);
});
test("main screen", async () => {
  render(
    <Provider store={store}>
      <ToastProvider>
        <MessageScreen />
      </ToastProvider>
    </Provider>
  );
  await screen.findByText((content, element) => content.includes("System Status"));
});

test("renders DynamicChart with default props", async () => {
  render(
    <Provider store={store}>
      <ToastProvider>
        <DynamicChart chartData={{ title: "Test Chart", data: [] }} />
      </ToastProvider>
    </Provider>
  );

  await waitFor(() => screen.findByText((content) => content.includes("Test Chart")), {
    timeout: 5000
  });
});

test("renders DynamicChart with constructData prop", async () => {
  const mockChartData = {
    title: "Construct Data Chart",
    data: [{ dtd_metrics: [{ x: 1, y: 2 }] }]
  };

  render(
    <Provider store={store}>
      <ToastProvider>
        <DynamicChart chartData={mockChartData} constructData={true} />
      </ToastProvider>
    </Provider>
  );

  await waitFor(() => screen.findByText((content) => content.includes("Construct Data Chart")), {
    timeout: 5000
  });
});

test("renders DynamicChart with modal open", async () => {
  render(
    <Provider store={store}>
      <ToastProvider>
        <DynamicChart chartData={{ title: "Modal Chart", data: [] }} isModalOpenButton={true} />
      </ToastProvider>
    </Provider>
  );

  await waitFor(() => screen.findByText((content) => content.includes("Modal Chart")), {
    timeout: 5000
  });
});

test("renders DynamicChart with custom dimensions", async () => {
  render(
    <Provider store={store}>
      <ToastProvider>
        <DynamicChart chartData={{ title: "Custom Dimensions Chart", data: [] }} customWidth={800} customHeight={400} />
      </ToastProvider>
    </Provider>
  );

  await waitFor(() => screen.findByText((content) => content.includes("Custom Dimensions Chart")), {
    timeout: 5000
  });
});

test("renders DynamicChart with split X-axis labels", async () => {
  render(
    <Provider store={store}>
      <ToastProvider>
        <DynamicChart chartData={{ title: "Split X-axis Chart", data: [] }} splitXaxisLabel={true} />
      </ToastProvider>
    </Provider>
  );

  await waitFor(() => screen.findByText((content) => content.includes("Split X-axis Chart")), {
    timeout: 5000
  });
});
