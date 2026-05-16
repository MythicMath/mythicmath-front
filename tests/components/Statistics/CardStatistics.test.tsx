import CardStatistics from "@/components/Statistics/CardStatistics";
import { render, screen } from "@testing-library/react-native";

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      foreground: "#111",
      muted: "#eee",

      success: "#22c55e",
      warning: "#f59e0b",
      destructive: "#ef4444",
      primary: "#3b82f6",
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

jest.mock("@/components/Core/Card", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: ({ children }: any) => <View>{children}</View>,
  };
});

jest.mock("@/icons/StatisticIcons", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  const MockIcon = ({ name }: any) => <Text>{name}</Text>;

  return {
    StatisticIcons: {
      trophy: {
        icon: MockIcon,
        iconName: "trophy-icon",
        colorKey: "warning",
      },

      heart: {
        icon: MockIcon,
        iconName: "heart-icon",
        colorKey: "destructive",
      },

      calendar: {
        icon: MockIcon,
        iconName: "calendar-icon",
        colorKey: "primary",
      },
    },
  };
});

describe("CardStatistics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render text", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("Wins")).toBeTruthy();
  });

  it("should render quantity", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("12")).toBeTruthy();
  });

  it("should render trophy icon", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("trophy-icon")).toBeTruthy();
  });

  it("should render horizontal variant by default", () => {
    render(
      <CardStatistics
        text="Matches"
        quantity={20}
        icon="calendar"
      />
    );

    expect(screen.getByText("Matches")).toBeTruthy();

    expect(screen.getByText("20")).toBeTruthy();

    expect(screen.getByText("calendar-icon")).toBeTruthy();
  });

  it("should render vertical variant", () => {
    render(
      <CardStatistics
        variant="vertical"
        text="Lives"
        quantity={3}
        icon="heart"
      />
    );

    expect(screen.getByText("Lives")).toBeTruthy();

    expect(screen.getByText("3")).toBeTruthy();

    expect(screen.getByText("heart-icon")).toBeTruthy();
  });
});