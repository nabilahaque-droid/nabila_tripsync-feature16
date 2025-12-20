import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders TripSync heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/TripSync/i);
  expect(headingElement).toBeInTheDocument();
});
