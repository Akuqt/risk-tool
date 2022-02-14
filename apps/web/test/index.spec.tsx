import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { App } from "../src/App";

test("should render", () => {
  const comp = render(<App />).container;
  expect(comp).toBeInTheDocument();
});
