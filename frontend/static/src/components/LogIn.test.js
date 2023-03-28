import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogIn from "./LogIn";

describe("LogIn component", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(<LogIn />);
    expect(getByText("Log In")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Log in")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Log in");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    // Add additional testing to check fetch request/response is properly executed.
  });

  it("shows an error message for invalid data", async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Log in");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(getByText("Incorrect credentials.")).toBeInTheDocument();
  });
});
