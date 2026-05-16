import CardStatistics from "@/components/Statistics/CardStatistics";
import { render, screen } from "@testing-library/react-native";

describe("CardStatistics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render text", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("Wins")).toBeTruthy();
  });

  it("should render quantity", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("12")).toBeTruthy();
  });

  it("should render trophy icon", () => {
    render(
      <CardStatistics
        text="Wins"
        quantity={12}
        icon="trophy"
      />
    );

    expect(screen.getByText("trophy")).toBeTruthy();
  });

  it("should render horizontal variant by default", () => {
    render(
      <CardStatistics
        text="Matches"
        quantity={20}
        icon="calendar"
      />
    );

    expect(screen.getByText("Matches")).toBeTruthy();

    expect(screen.getByText("20")).toBeTruthy();

    expect(screen.getByText("calendar")).toBeTruthy();
  });

  it("should render vertical variant", () => {
    render(
      <CardStatistics
        variant="vertical"
        text="Lives"
        quantity={3}
        icon="heart"
      />
    );

    expect(screen.getByText("Lives")).toBeTruthy();

    expect(screen.getByText("3")).toBeTruthy();

    expect(screen.getByText("heart")).toBeTruthy();
  });
});