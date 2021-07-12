"use strict";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";

expect.extend(toHaveNoViolations);


describe("Example App tests", () => {
  it("pass Axe tests", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders content", () => {
    render(<App />);

    expect(
      screen.getByText(/learn react/i) // by using exact false it WILL do matcher.test(text) as expected in testing-library-dom
    ).toBeInTheDocument();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });
});
