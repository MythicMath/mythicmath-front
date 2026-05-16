module.exports = function (api) {
  api.cache(true);

  const isTesting = process.env.NODE_ENV === "test";

  return {
    presets: isTesting
      ? ["babel-preset-expo"]
      : [
          ["babel-preset-expo", { jsxImportSource: "nativewind" }],
          "nativewind/babel",
        ],
    plugins: [...(isTesting ? [] : []), "react-native-reanimated/plugin"],
  };
};

/*
Babel Config for development:

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};

_____________________

Babel Config for testing: 

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", 
    ],
  };
};

*/
