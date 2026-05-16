import CardHome from "@/components/Home/CardHome";
import { render, screen } from "@testing-library/react-native";

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

    expect(screen.getByText("calendar")).toBeTruthy();
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

    expect(screen.getByText("heart")).toBeTruthy();
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

    expect(screen.getByText("trophy")).toBeTruthy();
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