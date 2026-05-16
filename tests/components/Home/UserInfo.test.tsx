import UserInfo from "@/components/Home/UserInfo";
import { render, screen } from "@testing-library/react-native";

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