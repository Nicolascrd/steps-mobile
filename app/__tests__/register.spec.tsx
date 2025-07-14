import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RegisterScreen from "../register";

describe("RegisterScreen", () => {
  it("renders email input and disables submit for invalid email", () => {
    const { getByText, getByRole, getByTestId } = render(<RegisterScreen />);
    const emailText = getByText("Email");
    expect(emailText).toBeTruthy();
    const emailInput = getByTestId("email-input");
    expect(emailInput).toBeTruthy();
    const submitButton = getByRole("button");
    expect(submitButton).toBeTruthy();
    fireEvent.changeText(emailInput, "invalid-email");
    expect(submitButton.props.accessibilityState.disabled).toBe(true);
    fireEvent.changeText(emailInput, "test@example.com");
    expect(submitButton.props.accessibilityState.disabled).toBe(false);
    fireEvent.press(submitButton);
    expect(getByText("Username")).toBeTruthy();
  });

  it("progresses through registration stages", () => {
    const { getByText, getByRole, getByTestId } = render(<RegisterScreen />);
    const emailInput = getByTestId("email-input");
    // Email stage
    const emailText = getByText("Email");
    expect(emailText).toBeTruthy();
    fireEvent.changeText(emailInput, "test@example.com");
    const button = getByRole("button");
    fireEvent.press(button);
    // At stage
    const userNameText = getByText("Username");
    expect(userNameText).toBeTruthy();
    const atInput = getByTestId("at-input");
    fireEvent.changeText(atInput, "user123");
    fireEvent.press(button);
    // Full Name stage
    const fullNameText = getByText("Full Name");
    expect(fullNameText).toBeTruthy();
    const fullNameInput = getByTestId("full-name-input");
    fireEvent.changeText(fullNameInput, "Test User");
    fireEvent.press(button);
    // Password stage
    const passwordText = getByText("Password");
    expect(passwordText).toBeTruthy();
    const passwordInput = getByTestId("password-input");
    fireEvent.changeText(passwordInput, "Password123!");
  });
});
