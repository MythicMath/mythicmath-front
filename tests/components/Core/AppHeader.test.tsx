import { AppHeader } from "@/components/Core/AppHeader";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

describe("AppHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render title", () => {
    render(<AppHeader title="Profile" />);

    expect(screen.getByText("Profile")).toBeTruthy();
  });

  it("should render back button by default", () => {
    render(<AppHeader />);

    expect(screen.getByText("chevron-back")).toBeTruthy();
  });

  it("should not render back button when showBack is false", () => {
    render(<AppHeader showBack={false} />);

    expect(screen.queryByText("chevron-back")).toBeNull();
  });

  it("should call router.back when back button is pressed", () => {
    render(<AppHeader />);

    fireEvent.press(screen.getByText("chevron-back"));

    expect(router.back).toHaveBeenCalled();
  });

  it("should call custom onBackPress when provided", () => {
    const onBackPress = jest.fn();

    render(<AppHeader onBackPress={onBackPress} />);

    fireEvent.press(screen.getByText("chevron-back"));

    expect(onBackPress).toHaveBeenCalled();
  });

  it("should render right icon", () => {
    render(<AppHeader rightIcon="settings-outline" />);

    expect(screen.getByText("settings-outline")).toBeTruthy();
  });

  it("should call onRightPress when right icon is pressed", () => {
    const onRightPress = jest.fn();

    render(
      <AppHeader rightIcon="settings-outline" onRightPress={onRightPress} />,
    );

    fireEvent.press(screen.getByText("settings-outline"));

    expect(onRightPress).toHaveBeenCalled();
  });
});
