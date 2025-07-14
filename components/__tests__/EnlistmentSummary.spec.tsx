import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EnlistmentSummary from "../EnlistmentSummary";
import { Stage } from "@/types/register.t";

describe("EnlistmentSummary", () => {
  const defaultProps = {
    fullName: "Test User",
    username: "user123",
    email: "test@example.com",
    goToStage: jest.fn(),
  };

  it("renders nothing if stage is email", () => {
    const { queryByText } = render(
      <EnlistmentSummary {...defaultProps} stage={Stage.email} />
    );
    expect(queryByText("Email:")).toBeNull();
    expect(queryByText("Username:")).toBeNull();
    expect(queryByText("Full Name:")).toBeNull();
  });

  it("renders email row and allows editing when stage > email", () => {
    const goToStage = jest.fn();
    const { getByText, getByRole } = render(
      <EnlistmentSummary
        {...defaultProps}
        stage={Stage.at}
        goToStage={goToStage}
      />
    );
    expect(getByText("Email:")).toBeTruthy();
    expect(getByText(defaultProps.email)).toBeTruthy();
    // The edit button for email is the first one
    const editButtons = getByRole("button");
    fireEvent.press(editButtons);
    expect(goToStage).toHaveBeenCalledWith(Stage.email);
  });

  it("renders username row and allows editing when stage > at", () => {
    const goToStage = jest.fn();
    const { getByText, getAllByRole } = render(
      <EnlistmentSummary
        {...defaultProps}
        stage={Stage.fullName}
        goToStage={goToStage}
      />
    );
    expect(getByText("Username:")).toBeTruthy();
    expect(getByText(defaultProps.username)).toBeTruthy();
    // There are multiple edit buttons, get the second one for username
    const editButtons = getAllByRole("button");
    fireEvent.press(editButtons[1]);
    expect(goToStage).toHaveBeenCalledWith(Stage.at);
  });

  it("renders full name row and allows editing when stage > fullName", () => {
    const goToStage = jest.fn();
    const { getByText, getAllByRole } = render(
      <EnlistmentSummary
        {...defaultProps}
        stage={Stage.password}
        goToStage={goToStage}
      />
    );
    expect(getByText("Full Name:")).toBeTruthy();
    expect(getByText(defaultProps.fullName)).toBeTruthy();
    // Third edit button for full name
    const editButtons = getAllByRole("button");
    fireEvent.press(editButtons[2]);
    expect(goToStage).toHaveBeenCalledWith(Stage.fullName);
  });

  it("shows header always", () => {
    const { getByText } = render(
      <EnlistmentSummary {...defaultProps} stage={Stage.email} />
    );
    expect(getByText("RECRUIT PROFILE")).toBeTruthy();
  });
});
