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

  it("renders content", async () => {
    render(<App />);

    expect(screen.getByText(/Learn/)).toBeInTheDocument();
    expect(screen.queryByText("blah")).not.toBeInTheDocument();
  });
});
