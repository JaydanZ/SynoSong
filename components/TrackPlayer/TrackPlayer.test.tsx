import { render, screen } from "@testing-library/react";
import TrackPlayer from "./TrackPlayer";

const TEST_TRACK_URL: string =
  "https://p.scdn.co/mp3-preview/39e5fed2e8dadd277d1a914fc6d6399e05eb4f5d?cid=f5320cc39bfc4127b45d2c0441abea20";

describe("TrackPlayer Component", () => {
  test("Audio Track Loaded Correctly", () => {
    // Arrange
    // Render track player
    render(<TrackPlayer trackURL={TEST_TRACK_URL} />);

    // Assert
    const audioEl: HTMLMediaElement = screen.getByTestId("audioElement");
    expect(audioEl.getAttribute("duration")).not.toBeNaN();
  });
});
