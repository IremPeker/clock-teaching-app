import { render, screen } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  render(<App />);
});

describe("App component is rendered correctly", () => {
  test("Analog clock is rendered", () => {
    const analogClock = screen.getByTestId("analog-clock");
    expect(analogClock).toBeInTheDocument();
  });
  test("Input fields are rendered", () => {
    const morningInput = screen.getByTestId("morning-input");
    const eveningInput = screen.getByTestId("evening-input");
    expect(morningInput).toBeInTheDocument();
    expect(eveningInput).toBeInTheDocument();
  });
  test("Buttons are rendered", () => {
    const checkButton = screen.getByTestId("check-button");
    const newTimeButton = screen.getByTestId("new-time-button");
    expect(checkButton).toBeInTheDocument();
    expect(newTimeButton).toBeInTheDocument();
  });
});
