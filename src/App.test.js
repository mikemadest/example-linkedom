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


    // quick experiment: with jsdom matcher is an instance of RegExp but not with linkedom
    const matcher = /learn react/i;
    console.log('matcher.constructor.name = ', matcher.constructor.name); // always RegExp as you would expect
    console.log(`matcher is ${matcher instanceof RegExp ? 'a' : 'NOT'} RegExp`);

    expect(
      screen.getByText(/learn react/i, { exact: false }) // by using exact false it WILL do matcher.test(text) as expected in testing-library-dom
    ).toBeInTheDocument();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });
});
