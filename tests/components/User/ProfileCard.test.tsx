import ProfileCard from "@/components/User/ProfileCard";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

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
      />,
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
      />,
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
      />,
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
      />,
    );

    expect(screen.getByText("screen.profile.level 8")).toBeTruthy();
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
      />,
    );

    expect(screen.getByText("screen.profile.progressUntil 6")).toBeTruthy();

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
      />,
    );

    fireEvent.press(screen.getByText("screen.profile.editProfile.buttonLink"));

    expect(router.push).toHaveBeenCalledWith("/profile/edit-profile");
  });
});
