jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (mockKey: string) => mockKey,
  }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),

  SafeAreaProvider: ({ children }: any) => children,
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  },
  Link: ({ children }: any) => children,
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    gradients: {
      daily: ["#111", "#222"],
      free: ["#333", "#444"],
      ranked: ["#555", "#666"],
      bgColored: ["#111", "#222"],
      bgColoredPressed: ["#333", "#444"],
    },
    colors: {
      foreground: "#111",
      background: "#fff",
      border: "#ccc",
      muted: "#eee",
      mutedForeground: "#777",
      destructive: "#ef4444",
      available: "#DCFCE7",
      availableForeground: "#16A34A",
      textLight: "#ffffff",
      textSoftDark: "#777",
      primary: "#3b82f6",
      primaryForeground: "#fff",
      secondary: "#e5e7eb",
      link: "#2563eb",
      inputBackground: "#fff",
      warning: "#f59e0b",
    },
  }),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const createIconMock = (displayName: string) => {
    const Icon = ({ name }: any) =>
      React.createElement(Text, null, `${name}`);
    Icon.displayName = displayName;
    return Icon;
  };

  return {
    Ionicons: createIconMock("Ionicons"),
    EvilIcons: createIconMock("EvilIcons"),
    MaterialCommunityIcons: createIconMock("MaterialCommunityIcons"),
    FontAwesome6: createIconMock("FontAwesome6"),
    Entypo: createIconMock("Entypo"),
    AntDesign: createIconMock("AntDesign"),
    Feather: createIconMock("Feather"),
    FontAwesome: createIconMock("FontAwesome"),
    MaterialIcons: createIconMock("MaterialIcons"),
  };
});

jest.mock("@expo/vector-icons/EvilIcons", () => {
  const mock = ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}`);
  };
  mock.displayName = "EvilIcons";
  return mock;
});

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const mock = ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}`);
  };
  mock.displayName = "MaterialCommunityIcons";
  return mock;
});

jest.mock("@expo/vector-icons/FontAwesome6", () => {
  const mock = ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}`);
  };
  mock.displayName = "FontAwesome6";
  return mock;
});

jest.mock("@expo/vector-icons/Entypo", () => {
  const mock = ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}`);
  };
  mock.displayName = "Entypo";
  return mock;
});

jest.mock("@expo/vector-icons/Feather", () => {
  const mock = ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}`);
  };
  mock.displayName = "Feather";
  return mock;
});

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: any) => children,
}));

jest.mock("@/components/Core/AppText", () => ({
  AppText: ({ children }: any) => {
    const React = require("react");
    return React.createElement("Text", null, children);
  },
}));

jest.mock("@/components/Core/Card", () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

jest.mock("@/components/User/Chip", () => ({
  Chip: ({ label }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, label);
  },
}));

jest.mock("@/components/User/Avatar", () => ({
  Avatar: ({ name }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, null, `${name}-avatar`);
  },
}));

jest.mock("@/components/Statistics/ProgressBar", () => ({
  ProgressBar: ({ progressValue, textLeft, textRight }: any) => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return React.createElement(
      View,
      null,
      React.createElement(Text, null, String(progressValue)),
      React.createElement(Text, null, textLeft),
      React.createElement(Text, null, textRight),
    );
  },
}));

jest.mock("@/components/Core/ButtonApp", () => ({
  ButtonApp: ({ title, onPress }: any) => {
    const React = require("react");
    const { TouchableOpacity, Text } = require("react-native");
    return React.createElement(
      TouchableOpacity,
      { onPress },
      React.createElement(Text, null, title),
    );
  },
}));
