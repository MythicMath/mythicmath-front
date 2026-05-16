import UserInfo from "@/components/Home/UserInfo";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      textLight: "#ffffff",
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

jest.mock("@/components/User/Chip", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    Chip: ({ label }: any) => <Text>{label}</Text>,
  };
});

jest.mock("@/components/User/Avatar", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    Avatar: ({ name }: any) => <Text>{name}-avatar</Text>,
  };
});

jest.mock("@/components/Statistics/ProgressBar", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, Text } = require("react-native");

  return {
    ProgressBar: ({
      progressValue,
      textLeft,
      textRight,
    }: any) => (
      <View>
        <Text>{progressValue}</Text>
        <Text>{textLeft}</Text>
        <Text>{textRight}</Text>
      </View>
    ),
  };
});

describe("UserInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render user name", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={5}
        xpCurrent={200}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("Ana")).toBeTruthy();
  });

  it("should render avatar", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={5}
        xpCurrent={200}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("Ana-avatar")).toBeTruthy();
  });

  it("should render level chip", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={10}
        xpCurrent={200}
        xpToNextLevel={500}
      />
    );

    expect(
      screen.getByText("screen.home.level 10")
    ).toBeTruthy();
  });

  it("should render progress bar texts", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={10}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("XP:  250")).toBeTruthy();

    expect(
      screen.getByText("screen.home.progressUntil 500")
    ).toBeTruthy();
  });

  it("should calculate progress correctly", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={10}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("50")).toBeTruthy();
  });

  it("should cap progress at 100", () => {
    render(
      <UserInfo
        image="https://example.com/avatar.png"
        name="Ana"
        level={10}
        xpCurrent={1000}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("100")).toBeTruthy();
  });
});