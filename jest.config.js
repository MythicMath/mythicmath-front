module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { configFile: "./babel.config.js" },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(" +
      "react-native|" +
      "@react-native|" +
      "@react-native-community|" +
      "expo|" +
      "expo-font|" +
      "expo-modules-core|" +
      "@expo|" +
      "@expo-google-fonts|" +
      "@react-navigation|" +
      "nativewind|" +
      "react-native-css-interop|" +
      "react-native-reanimated|" +
      "react-native-gesture-handler|" +
      "react-native-svg" +
      ")/)",
  ],

  moduleNameMapper: {
    // stub out static assets that can't be parsed
    "\\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2)$":
      "<rootDir>/tests/__mocks__/fileMock.js",
  },
};
