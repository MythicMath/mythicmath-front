import ButtonGradient from "@/components/Core/ButtonGradient";
import { Pressable, Text } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("ButtonGradient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", () => {
    render(
      <ButtonGradient>
        <Text>Login</Text>
      </ButtonGradient>,
    );

    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();

    render(
      <ButtonGradient onPress={onPress}>
        <Text>Login</Text>
      </ButtonGradient>,
    );

    fireEvent.press(screen.getByText("Login"));

    expect(onPress).toHaveBeenCalled();
  });

  it("should render disabled state", () => {
    render(
      <ButtonGradient disabled>
        <Text>Disabled Button</Text>
      </ButtonGradient>,
    );

    expect(screen.getByText("Disabled Button")).toBeTruthy();
  });

  it("should not call onPress when disabled", () => {
    const onPress = jest.fn();

    render(
      <ButtonGradient onPress={onPress} disabled>
        <Text>Disabled Button</Text>
      </ButtonGradient>,
    );

    fireEvent.press(screen.getByText("Disabled Button"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("should render loading indicator", () => {
    render(
      <ButtonGradient loading>
        <Text>Loading Button</Text>
      </ButtonGradient>,
    );

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should not call onPress when loading", () => {
    const onPress = jest.fn();

    render(
      <ButtonGradient onPress={onPress} loading>
        <Text>Loading Button</Text>
      </ButtonGradient>,
    );

    fireEvent.press(screen.getByTestId("gradient-button"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("should render with custom gradients", () => {
    render(
      <ButtonGradient
        bgColored={["#fff", "#eee"]}
        bgColoredPressed={["#ddd", "#ccc"]}
      >
        <Text>Custom Gradient</Text>
      </ButtonGradient>,
    );

    expect(screen.getByText("Custom Gradient")).toBeTruthy();
  });
});
