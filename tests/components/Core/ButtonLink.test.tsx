import { ButtonLink } from "@/components/Core/ButtonLink";
import { render, screen, fireEvent } from "@testing-library/react-native";

const linkMock = jest.fn();

jest.mock("expo-router", () => ({
  Link: ({ children }: any) => children,
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      link: "#3b82f6",
    },
  }),
}));

jest.mock("@/components/Core/AppText", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    AppText: ({ children }: any) => <Text>{children}</Text>,
  };
});

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
