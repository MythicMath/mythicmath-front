import { ButtonApp } from "@/components/Core/ButtonApp";

import { render, screen, fireEvent } from "@testing-library/react-native";

jest.mock("@/hooks/useTheme", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { mockUseTheme } = require("@/tests/mocks/useTheme.mock");

  return {
    useTheme: mockUseTheme,
  };
});

jest.mock("@/components/Core/AppText", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MockAppText } = require("@/tests/mocks/appText.mock");

  return {
    AppText: MockAppText,
  };
});

describe("ButtonApp", () => {
  it("should render button title", () => {
    render(<ButtonApp title="Login" />);

    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("should call onPress when button is pressed", () => {
    const onPress = jest.fn();

    render(<ButtonApp title="Login" onPress={onPress} />);

    fireEvent.press(screen.getByText("Login"));

    expect(onPress).toHaveBeenCalled();
  });

  it("should render primary variant by default", () => {
    render(<ButtonApp title="Primary Button" />);

    expect(screen.getByText("Primary Button")).toBeTruthy();
  });

  it("should render secondary variant", () => {
    render(<ButtonApp title="Secondary Button" variant="secondary" />);

    expect(screen.getByText("Secondary Button")).toBeTruthy();
  });

  it("should render destructive variant", () => {
    render(<ButtonApp title="Delete" variant="destructive" />);

    expect(screen.getByText("Delete")).toBeTruthy();
  });

  it("should render outline variant", () => {
    render(<ButtonApp title="Outline" variant="outline" />);

    expect(screen.getByText("Outline")).toBeTruthy();
  });

  it("should render ghost variant", () => {
    render(<ButtonApp title="Ghost" variant="ghost" />);

    expect(screen.getByText("Ghost")).toBeTruthy();
  });
});
