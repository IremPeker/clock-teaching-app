// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.spyOn(console, "error").mockImplementation((message) => {
  if (message.includes("ReactDOMTestUtils.act is deprecated")) {
    return; // Suppress only this specific warning
  }
  console.error(message); // Allow other errors
});
