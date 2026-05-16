import { ButtonLink } from "@/components/Core/ButtonLink";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("ButtonLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render title", () => {
    render(<ButtonLink title="Create account" href="/register" />);

    expect(screen.getByText("Create account")).toBeTruthy();
  });

  it("should render link component", () => {
    render(<ButtonLink title="Go to register" href="/register" />);

    expect(screen.getByText("Go to register")).toBeTruthy();
  });

  it("should allow press interaction", () => {
    render(<ButtonLink title="Go to profile" href="/profile" />);

    fireEvent.press(screen.getByText("Go to profile"));
  });
});
