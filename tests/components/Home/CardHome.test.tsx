import CardHome from "@/components/Home/CardHome";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    gradients: {
      daily: ["#111", "#222"],
      free: ["#333", "#444"],
      ranked: ["#555", "#666"],
    },

    colors: {
      background: "#fff",

      available: "#DCFCE7",
      availableForeground: "#16A34A",
    },
  }),
}));

jest.mock("expo-linear-gradient", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");

  return {
    LinearGradient: ({ children }: any) => <View>{children}</View>,
  };
});

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

jest.mock("@/components/User/Chip", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    Chip: ({ label }: any) => <Text>{label}</Text>,
  };
});

jest.mock("@/icons/StatisticIcons", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  const MockIcon = ({ name }: any) => <Text>{name}</Text>;

  return {
    StatisticIcons: {
      calendar: {
        icon: MockIcon,
        iconName: "calendar-icon",
      },

      heart: {
        icon: MockIcon,
        iconName: "heart-icon",
      },

      trophy: {
        icon: MockIcon,
        iconName: "trophy-icon",
      },
    },
  };
});

describe("CardHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render daily mode", () => {
    render(
      <CardHome
        mode="daily"
        status="available"
      />
    );

    expect(
      screen.getByText("screen.home.gameModes.daily.title")
    ).toBeTruthy();

    expect(
      screen.getByText("screen.home.gameModes.daily.infoOne")
    ).toBeTruthy();

    expect(screen.getByText("calendar-icon")).toBeTruthy();
  });

  it("should render free mode", () => {
    render(
      <CardHome
        mode="free"
        status="available"
      />
    );

    expect(
      screen.getByText("screen.home.gameModes.free.title")
    ).toBeTruthy();

    expect(
      screen.getByText("screen.home.gameModes.free.infoOne")
    ).toBeTruthy();

    expect(
      screen.getByText("screen.home.gameModes.free.infoTwo")
    ).toBeTruthy();

    expect(screen.getByText("heart-icon")).toBeTruthy();
  });

  it("should render ranked mode", () => {
    render(
      <CardHome
        mode="ranked"
        status="available"
      />
    );

    expect(
      screen.getByText("screen.home.gameModes.ranked.title")
    ).toBeTruthy();

    expect(
      screen.getByText("screen.home.gameModes.ranked.infoOne")
    ).toBeTruthy();

    expect(
      screen.getByText("screen.home.gameModes.ranked.infoTwo")
    ).toBeTruthy();

    expect(screen.getByText("trophy-icon")).toBeTruthy();
  });

  it("should render available chip", () => {
    render(
      <CardHome
        mode="daily"
        status="available"
      />
    );

    expect(
      screen.getByText("screen.home.gameModes.available")
    ).toBeTruthy();
  });

  it("should not render available chip when unavailable", () => {
    render(
      <CardHome
        mode="daily"
        status="unavailable"
      />
    );

    expect(
      screen.queryByText("screen.home.gameModes.available")
    ).toBeNull();
  });
});