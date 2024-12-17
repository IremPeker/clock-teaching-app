import { render, screen } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  render(<App />);
});

describe("App component is rendered correctly", () => {
  test("Analog clock is rendered", () => {
    const analogClock: HTMLElement = screen.getByTestId("analog-clock");
    expect(analogClock).toBeInTheDocument();
  });
  test("Input fields are rendered", () => {
    const morningInput: HTMLInputElement = screen.getByTestId("morning-input");
    const eveningInput: HTMLInputElement = screen.getByTestId("evening-input");
    expect(morningInput).toBeInTheDocument();
    expect(eveningInput).toBeInTheDocument();
  });
  test("Buttons are rendered", () => {
    const checkButton: HTMLButtonElement = screen.getByTestId("check-button");
    const newTimeButton: HTMLButtonElement =
      screen.getByTestId("new-time-button");
    expect(checkButton).toBeInTheDocument();
    expect(newTimeButton).toBeInTheDocument();
  });
});
