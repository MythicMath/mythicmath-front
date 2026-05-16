import ProfileCard from "@/components/User/ProfileCard";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      textSoftDark: "#777",
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

jest.mock("@/components/User/Chip", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    Chip: ({ label }: any) => <Text>{label}</Text>,
  };
});

jest.mock("@/components/User/Avatar", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text, Pressable } = require("react-native");

  return {
    Avatar: ({ name, onEditPress }: any) => (
      <Pressable onPress={onEditPress}>
        <Text>{name}-avatar</Text>
      </Pressable>
    ),
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

jest.mock("@/components/Core/ButtonApp", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pressable, Text } = require("react-native");

  return {
    ButtonApp: ({ title, onPress }: any) => (
      <Pressable onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    ),
  };
});

describe("ProfileCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render user name", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={5}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("Ana")).toBeTruthy();
  });

  it("should render email", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={5}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("ana@email.com")).toBeTruthy();
  });

  it("should render avatar", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={5}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(screen.getByText("Ana-avatar")).toBeTruthy();
  });

  it("should render level chip", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={8}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(
      screen.getByText("screen.profile.level 8")
    ).toBeTruthy();
  });

  it("should render progress information", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={5}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    expect(
      screen.getByText("screen.profile.progressUntil 6")
    ).toBeTruthy();

    expect(screen.getByText("50")).toBeTruthy();

    expect(screen.getByText("50%")).toBeTruthy();
  });

  it("should navigate to edit profile screen", () => {
    render(
      <ProfileCard
        image="https://example.com/avatar.png"
        name="Ana"
        email="ana@email.com"
        level={5}
        xpCurrent={250}
        xpToNextLevel={500}
      />
    );

    fireEvent.press(
      screen.getByText("screen.profile.editProfile.buttonLink")
    );

    expect(router.push).toHaveBeenCalledWith(
      "/profile/edit-profile"
    );
  });
});