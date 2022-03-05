import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { App } from "../src/App";

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

Object.defineProperty(global.navigator, "geolocation", {
  value: mockGeolocation,
});

test("should render", () => {
  const comp = render(<App />).container;
  expect(comp).toBeInTheDocument();
});
