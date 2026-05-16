import InputField from "@/components/Core/InputField";
import { render, screen, fireEvent } from "@testing-library/react-native";


jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      border: "#ccc",
      foreground: "#111",
      inputBackground: "#fff",
      mutedForeground: "#777",
      destructive: "#f00",
    },
  }),
}));

jest.mock("@expo/vector-icons", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    Ionicons: ({ name }: any) => <Text>{name}</Text>,
  };
});

jest.mock("@/components/Core/AppText", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");

  return {
    AppText: ({ children }: any) => <Text>{children}</Text>,
  };
});

describe("InputField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render placeholder label", () => {
    render(
      <InputField
        placeholder="Email"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("should render input placeholder", () => {
    render(
      <InputField
        placeholder="Password"
        onChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
  });

  it("should call onChange when typing", () => {
    const onChange = jest.fn();

    render(
      <InputField
        placeholder="Email"
        onChange={onChange}
      />
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "ana@email.com"
    );

    expect(onChange).toHaveBeenCalledWith("ana@email.com");
  });

  it("should render error message", () => {
    render(
      <InputField
        placeholder="Email"
        error="Invalid email"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Invalid email")).toBeTruthy();
  });

  it("should render secure text toggle icon", () => {
    render(
      <InputField
        placeholder="Password"
        secureTextEntry
        onChange={() => {}}
      />
    );

    expect(screen.getByText("eye-off")).toBeTruthy();
  });

  it("should toggle password visibility", () => {
    render(
      <InputField
        placeholder="Password"
        secureTextEntry
        onChange={() => {}}
      />
    );

    fireEvent.press(screen.getByText("eye-off"));

    expect(screen.getByText("eye")).toBeTruthy();
  });

  it("should call onFocus", () => {
    const onFocus = jest.fn();

    render(
      <InputField
        placeholder="Email"
        onFocus={onFocus}
        onChange={() => {}}
      />
    );

    fireEvent(screen.getByPlaceholderText("Email"), "focus");

    expect(onFocus).toHaveBeenCalled();
  });

  it("should call onBlur", () => {
    const onBlur = jest.fn();

    render(
      <InputField
        placeholder="Email"
        onBlur={onBlur}
        onChange={() => {}}
      />
    );

    fireEvent(screen.getByPlaceholderText("Email"), "blur");

    expect(onBlur).toHaveBeenCalled();
  });
});